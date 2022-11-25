import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { startCase } from "lodash";
import {
  Row,
  Col,
  PageHeader,
  Typography,
  Avatar,
  Dropdown,
  Space,
  Timeline,
  Collapse,
  Menu,
  Empty,
  Tooltip,
  Button,
  Select,
  Tag,
  notification,
  Popover,
  List,
  Comment,
  Form,
  Input,
} from "antd";
import {
  ClockCircleOutlined,
  MoreOutlined,
  InfoCircleOutlined,
  CopyFilled,
  DeleteFilled,
  EditFilled,
  CalendarOutlined,
  LockOutlined,
  CaretRightOutlined,
  HistoryOutlined,
  BankOutlined,
} from "@ant-design/icons";

import {
  OKR_STATUS_NOT_FOUND,
  currentUser,
  OKR_TYPE,
  krUnitOptions,
  getStatusColorPro,
  timeAgoFrom,
} from "../../../utils/constants";
import { CustomProgress, PopoverContent } from "../../../components";
import { CommentsModal, OKRForm, DeleteOKR, CheckinPopup } from ".";
import { Kr, OkrElement } from "../okr.types";
import {
  commentOnOkrAsync,
  getCompanyOkrsAsync,
  getIndividualOkrsAsync,
  getKrFeedbacksAsync,
  selectOkr,
} from "../okrSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getAllTimePeriodsAsync,
  selectTime,
} from "../../TimePeriod/timeperiodSlice";
import Loading from "../../../components/Loading";

type OKRListProps = {
  okrType: OKR_TYPE;
  showHeader?: boolean;
  owner?: string;
};

const OKRList: React.FC<OKRListProps> = ({ okrType, showHeader, owner }) => {
  const EMPTY_OKR_LIST = "No OKRs. Try creating one";

  const dispatch = useAppDispatch();
  const { data, companyData, status } = useAppSelector(selectOkr);
  const { data: timePeriods, status: timePeriodStatus } =
    useAppSelector(selectTime);
  const loading = status === "loading" || timePeriodStatus === "loading";
  const isCompany = okrType === OKR_TYPE.CompanyWide;

  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<any>({
    currentKrId: "",
    currentOKrId: "",
  });
  const [openOKRForm, setOpenOKRForm] = useState<boolean>(false);
  const [quarter, setQuarter] = useState<any>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openOKRDelete, setOpenOKRDelete] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>({});
  const [form] = Form.useForm();
  const [krId, setKrId] = useState("");
  const [activePanel, setActivePanel] = useState([]);
  const [activeCheckin, setActiveCheckin] = useState(false);

  const onComment = (values: any) => {
    dispatch(commentOnOkrAsync({ krsId: krId, text: values.text }));
    form.resetFields();
    setTimeout(() => {
      dispatch(getCompanyOkrsAsync({ quarter, owner }));
      dispatch(getIndividualOkrsAsync({ quarter, owner }));
    }, 600);
  };
  const closeOKRForm = () => setOpenOKRForm(false);
  const closeOKRDelete = () => setOpenOKRDelete(false);
  const closeCommentsModal = () => setShowCommentsModal(false);
  const onCreateOKR = () => {
    setEditMode(false);
    setCurrentRow({});
    timePeriods.length !== 0
      ? setOpenOKRForm(true)
      : notification.warning({
          message: `No time period found! Please contact your organization administrator`,
        });
  };

  const okrMenuItems = [
    {
      title: "Edit Objective",
      disabled: false,
      onClick: (row: any) => () => {
        setEditMode(true);
        setOpenOKRForm(true);
        setCurrentRow(row);
      },
      icon: <EditFilled />,
    },
    {
      title: "Clone OKR",
      onClick: (row: any) => () => {
        setEditMode(false);
        setCurrentRow({
          ...row,
          okrObjective: `${row.okrObjective} (Copy)`,
          krs: row.krs.map((kr: any) => ({
            keyResult: kr.keyResult,
            start: kr.start,
            target: kr.target,
            unit: kr.unit,
            isBoolean: kr.isBoolean,
            currentValue: 0,
          })),
        });
        setOpenOKRForm(true);
      },
      icon: <CopyFilled />,
    },
    {
      title: "Delete",
      onClick: (row: any) => () => {
        setOpenOKRDelete(true);
        setCurrentRow(row);
      },
      icon: <DeleteFilled />,
    },
  ];

  const refreshOkrsList = () => {
    setTimeout(() => {
      dispatch(getCompanyOkrsAsync({ quarter, owner }));
      dispatch(getIndividualOkrsAsync({ quarter, owner }));
    }, 600);
  };

  const setKr = (data: Kr, okrObjectiveId: string) => () => {
    setCurrentId({ currentKrId: data?.krsId, currentOkrId: okrObjectiveId });
    dispatch(getKrFeedbacksAsync({ krsId: data?.krsId }));
    setShowCommentsModal(true);
  };

  const OKRDropDown = ({ details }: { details: any }) => {
    const userCannotEdit = currentUser?.userid !== details?.okrOwner?._id;

    return (
      <StyledDropdown
        overlay={
          <Menu>
            {okrMenuItems
              .filter((item) =>
                userCannotEdit || isCurrentTimePeriodLocked
                  ? item.title === "Clone OKR"
                  : true
              )
              .map((item) => (
                <Menu.Item
                  key={item.title}
                  icon={item.icon}
                  onClick={item.onClick(details)}
                >
                  {item.title}
                </Menu.Item>
              ))}
          </Menu>
        }
      >
        <MoreIcon />
      </StyledDropdown>
    );
  };

  const handleDueDays = useCallback(
    (quarter: string) => {
      const endDate = timePeriods?.filter((t: any) => t._id === quarter)[0]
        ?.endDate;
      return moment(endDate).diff(moment(moment.now()), "d");
    },
    [timePeriods]
  );

  const isCurrentTimePeriodLocked = timePeriods?.filter(
    (t: any) => t?._id === quarter
  )[0]?.isLocked;

  const pageActions = [
    <Row gutter={[16, 16]} justify={"space-between"}>
      <Col sm={16} xs={24}>
        <StyledSelect
          placeholder="Select a time period"
          value={quarter}
          suffixIcon={<CalendarOutlined />}
          onChange={(value: any) => setQuarter(value)}
        >
          {timePeriods.map((q: any) => (
            <Select.Option value={q?._id}>
              <Space direction="horizontal">
                {q?.name}
                {q?.isCurrent && <Tag>current</Tag>}
                {q?.isLocked && <LockOutlined />}
              </Space>
            </Select.Option>
          ))}
        </StyledSelect>
      </Col>
      <Col sm={6} xs={24}>
        {!(okrType === "company") && (
          <Button
            type="primary"
            disabled={isCurrentTimePeriodLocked}
            onClick={onCreateOKR}
            style={{ display: showHeader ? "block" : "none" }}
          >
            Create OKR
          </Button>
        )}
      </Col>
    </Row>,
  ];

  const PanelHeader = ({ okr }: { okr: OkrElement }) => (
    <Row align="middle" wrap>
      <Col sm={10} xs={13}>
        <Space size="large">
          <Popover
            content={
              <PopoverContent
                // @ts-ignore
                avatar={okr?.okrOwner?.avatar}
                firstName={okr?.okrOwner?.firstName || ""}
                surname={okr?.okrOwner?.surname || ""}
                email={""}
                // @ts-ignore
                designation={okr?.okrOwner?.designation || ""}
                phone={""}
                location={""}
              />
            }
          >
            <Avatar
              size="large"
              // @ts-ignore
              src={okr?.okrOwner?.avatar}
            />
          </Popover>
          <Space direction="vertical">
            <Typography.Text>
              {okr?.okrObjective}{" "}
              {okr.okrType === "company" && (
                <StyledTag>
                  {" "}
                  <BankOutlined /> Organizational{" "}
                </StyledTag>
              )}
            </Typography.Text>
            <Space size={20}>
              <Typography.Text type="secondary">
                <Tooltip title="Status">
                  <InfoIcon />
                </Tooltip>
                <Typography.Text
                  // @ts-ignore
                  style={{ color: getStatusColorPro(okr?.okrStatus) }}
                >
                  {startCase(okr?.okrStatus || OKR_STATUS_NOT_FOUND)}
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </Col>
      <Col sm={6} xs={10}>
        <Space>
          <ClockCircleOutlined type="primary" />
          {`Due by ${handleDueDays(okr?.quarter)} days`}
        </Space>
      </Col>
      <CustomProgressCol sm={7} xs={22} style={{ display: "flex", gap: "5px" }}>
        <CustomProgress
          size="default"
          percent={okr?.okrProgress || 0}
          width={"100%"}
          expected={okr?.okrStatus}
        />
      </CustomProgressCol>
      <Col span={1}>{showHeader && <OKRDropDown details={okr} />}</Col>
    </Row>
  );
  const PanelHeaderComments = ({ count }: { count: any }) => (
    <Row align="middle" wrap>
      <Col>
        <Row>{`Comments (${count})`}</Row>
      </Col>
    </Row>
  );

  const collapseCheckin = (e: any) => {
    if (activeCheckin) {
      setActiveCheckin(false);
    } else {
      setActiveCheckin(true);
    }
  };

  const childOkrs = (childOkrList: any) => {
    return (
      <>
        {childOkrList?.map((okr: any) => {
          return (
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Collapse.Panel
                key={okr.okrObjectiveId}
                header={<PanelHeader okr={okr} />}
              >
                <StyledTimeline>
                  {okr?.krs?.map((kr: Kr) => (
                    <PanelItem
                      kr={kr}
                      okrOwnerId={okr?.okrOwner?._id}
                      okrObjectiveId={okr?.okrObjectiveId}
                    />
                  ))}
                  {okr?.childOkrs?.length > 0 && childOkrs(okr?.childOkrs)}
                </StyledTimeline>
              </Collapse.Panel>
            </Collapse>
          );
        })}
      </>
    );
  };

  const PanelItem = ({
    kr,
    okrOwnerId,
    okrObjectiveId,
  }: {
    kr: Kr;
    okrOwnerId: string;
    okrObjectiveId: string;
  }) => {
    const comments = kr?.krComments.filter(
      (k) => k.text !== "" && k?.text?.length > 0
    )?.length;
    const comments1 = kr?.krComments
      .filter((k) => k.text !== "" && k?.text?.length > 0)
      ?.reverse();

    return (
      <Timeline.Item key={kr?.krsId}>
        <Row justify="space-between" align="middle" wrap>
          <Col xl={6} sm={20} xs={20}>
            <Typography.Text>{kr?.keyResult}</Typography.Text>
          </Col>
          <CheckinPopupCol xl={16} sm={24} xs={24}>
            <CheckinPopup
              kr={kr}
              viewMode={
                !showHeader ||
                timePeriods?.filter((t: any) => t?._id === quarter)[0]?.isLocked
              }
              okrOwnerId={okrOwnerId}
              isBoolean={kr?.unit === krUnitOptions[2].value}
              progress={kr?.currentValue}
              onFinish={refreshOkrsList}
              timePeriods={timePeriods}
              quarter={quarter}
              onCollapse={activeCheckin}
            />
          </CheckinPopupCol>
          <Col span={2}>
            <Button type="text" onClick={setKr(kr, okrObjectiveId)}>
              {/* <Badge size="small"> */}
              <Tooltip title="Activity Feed">
                <HistoryIcon />
              </Tooltip>
              {/* </Badge> */}
            </Button>
          </Col>
          <Col span={24}>
            <Collapse
              defaultActiveKey={krId}
              onChange={(e: any) => {
                setKrId(() => (e?.length > 0 ? kr?.krsId : ""));
              }}
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Collapse.Panel
                key={kr?.krsId}
                header={<PanelHeaderComments count={comments} />}
              >
                <Container style={{ maxWidth: "800px", width: "100%" }}>
                  <Form onFinish={onComment} form={form}>
                    <Row>
                      <Col span={2}>
                        <Avatar size="small" src={currentUser?.avatar} />
                      </Col>
                      <Col span={18}>
                        <Form.Item
                          name="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input your comment!",
                            },
                          ]}
                        >
                          <Input.TextArea rows={1} maxLength={300} showCount />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item>
                          <Button type="link" size="small" htmlType="submit">
                            Send
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                  <List
                    dataSource={comments1}
                    rowKey={(row: any) => row?._id}
                    size="small"
                    pagination={{
                      pageSize: 3,
                      size: "small",
                    }}
                    renderItem={(comment: any) => (
                      <Comment
                        author={`${comment?.commentedBy?.firstName} ${
                          comment?.commentedBy?.surname || ""
                        } commented`}
                        avatar={<Avatar src={comment?.commentedBy?.avatar} />}
                        datetime={
                          <Typography.Text>
                            {timeAgoFrom(comment?.createdAt)}
                          </Typography.Text>
                        }
                        content={
                          <Typography.Paragraph>
                            {comment.text}
                          </Typography.Paragraph>
                        }
                      />
                    )}
                  />
                </Container>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Timeline.Item>
    );
  };

  const getComment = useMemo(() => {
    const krData = isCompany ? companyData : data;
    for (let item of krData?.okrs) {
      if (item?.okrObjectiveId === currentId?.currentOkrId) {
        for (let element of item?.krs) {
          if (element?.krsId === currentId?.currentKrId) {
            return element;
          }
        }
        break;
      }
    }
  }, [currentId, data, companyData, isCompany]);

  useEffect(() => {
    if (quarter !== "") {
      if (isCompany) {
        dispatch(getCompanyOkrsAsync({ quarter }));
      } else {
        dispatch(getIndividualOkrsAsync({ quarter, owner }));
      }
    }
  }, [dispatch, quarter, isCompany, owner]);

  useEffect(() => {
    dispatch(getAllTimePeriodsAsync());
  }, [dispatch]);

  useEffect(() => {
    const currentQuarter = timePeriods.filter((t: any) => t?.isCurrent);
    if (currentQuarter.length) {
      setQuarter(currentQuarter[0]?._id);
    }
  }, [timePeriods]);

  useEffect(() => {
    setActivePanel(
      (isCompany ? companyData : data)?.okrs?.map(
        (okr: OkrElement) => okr.okrObjectiveId
      )
    );
  }, [data, companyData]);

  return (
    <Container>
      {showHeader && (
        <PageHeader title={!isCompany && "OKR"} extra={pageActions} />
      )}
      {!(isCompany ? companyData : data)?.okrs.length && !loading && (
        <Row style={{ padding: 50 }} justify="center">
          <Empty description={EMPTY_OKR_LIST} />
        </Row>
      )}
      {loading && <Loading />}
      {activePanel.length > 0 && (
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={activePanel}
          onChange={(e: any) => {
            collapseCheckin(e);
          }}
        >
          {(isCompany ? companyData : data)?.okrs?.map((okr: OkrElement) => (
            <Collapse.Panel
              key={okr.okrObjectiveId}
              header={<PanelHeader okr={okr} />}
            >
              <StyledTimeline>
                {okr?.krs?.map((kr: Kr) => (
                  <PanelItem
                    kr={kr}
                    okrOwnerId={okr?.okrOwner?._id}
                    okrObjectiveId={okr?.okrObjectiveId}
                  />
                ))}
                {okr.childOkrs?.length > 0 && childOkrs(okr.childOkrs)}
              </StyledTimeline>
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
      {showCommentsModal && (
        <CommentsModal
          open={showCommentsModal}
          onClose={closeCommentsModal}
          kr={getComment}
          viewMode={!showHeader || isCurrentTimePeriodLocked}
          onFinish={refreshOkrsList}
        />
      )}
      {openOKRForm && (
        <OKRForm
          row={currentRow}
          isCompany={isCompany}
          editMode={editMode}
          open={openOKRForm}
          onClose={closeOKRForm}
          timePeriods={timePeriods}
          currentQuarter={quarter}
          onFinish={refreshOkrsList}
        />
      )}
      {openOKRDelete && (
        <DeleteOKR
          open={openOKRDelete}
          onClose={closeOKRDelete}
          id={currentRow?.okrObjectiveId}
          onFinish={refreshOkrsList}
        />
      )}
    </Container>
  );
};

export default OKRList;

const Container = styled.div`
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    align-items: center;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-left: 10px;
`;

const InfoIcon = styled(InfoCircleOutlined)`
  margin-right: 10px;
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 20px;
`;

const HistoryIcon = styled(HistoryOutlined)`
  font-size: 16px;
`;

const StyledSelect = styled(Select)`
  min-width: 350px;

  @media screen and (max-width: 750px) {
    min-width: 300px;
  }
  @media screen and (max-width: 576px) {
    min-width: 0px;
    max-width: 300px;
    width: 100%;
  }
  @media screen and (max-width: 300px) {
    max-width: 200px;
    width: 100%;
  }
`;

const StyledTimeline = styled(Timeline)`
  margin-left: 50px;
  margin-top: 20px;

  @media screen and (max-width: 576px) {
    margin-left: 0px;
  }
`;

const CustomProgressCol = styled(Col)`
  @media screen and (max-width: 576px) {
    order: 4;
  }
`;

const CheckinPopupCol = styled(Col)`
  @media screen and (max-width: 1200px) {
    margin-left: 5px;
    margin-right: 5px;
    order: 4;
  }
`;

const StyledTag = styled(Tag)`
  margin-left: 10px;
`;
