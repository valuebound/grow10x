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
  Badge,
  Button,
  Select,
  Tag,
  notification,
} from "antd";
import {
  ClockCircleOutlined,
  MoreOutlined,
  CommentOutlined,
  InfoCircleOutlined,
  CopyFilled,
  DeleteFilled,
  EditFilled,
  CalendarOutlined,
  LockOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import {
  OKR_STATUS_NOT_FOUND,
  currentUser,
  OKR_TYPE,
  krUnitOptions,
  getStatusColorPro,
} from "../../../utils/constants";
import { CustomProgress } from "../../../components";
import { CommentsModal, OKRForm, DeleteOKR, CheckinPopup } from ".";
import { Kr, OkrElement } from "../okr.types";
import {
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
  // const [currentQuarter, setCurrentQuarter] = useState("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openOKRDelete, setOpenOKRDelete] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>({});

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
      isCompany
        ? dispatch(getCompanyOkrsAsync({ quarter, owner }))
        : dispatch(getIndividualOkrsAsync({ quarter, owner }));
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
    </StyledSelect>,
    <Button
      type="primary"
      disabled={isCurrentTimePeriodLocked}
      onClick={onCreateOKR}
      style={{ display: showHeader ? "block" : "none" }}
    >
      Create OKR
    </Button>,
  ];

  const PanelHeader = ({ okr }: { okr: OkrElement }) => (
    <Space size="large">
      <Avatar
        size="large"
        // @ts-ignore
        src={okr?.okrOwner?.avatar}
      />
      <Space direction="vertical">
        <Typography.Text>{okr?.okrObjective}</Typography.Text>
        <Space size={20}>
          <Typography.Text type="secondary">
            <Tooltip title="Status">
              <InfoIcon />
            </Tooltip>
            {/* @ts-ignore */}
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
  );

  const PanelExtra = ({ okr }: { okr: OkrElement }) => (
    <StyledPanelItem onClick={(e) => e.stopPropagation()}>
      <Space style={{ width: 450 }}>
        <ClockCircleOutlined type="primary" />
        {`Due by ${handleDueDays(okr?.quarter)} days`}
      </Space>
      <CustomProgress
        size="default"
        percent={okr?.okrProgress || 0}
        width={300}
        expected={okr?.okrStatus}
      />
      {showHeader && <OKRDropDown details={okr} />}
    </StyledPanelItem>
  );

  const PanelItem = ({
    kr,
    okrOwnerId,
    okrObjectiveId,
  }: {
    kr: Kr;
    okrOwnerId: string;
    okrObjectiveId: string;
  }) => {
    const comments = kr?.krComments.filter((k) => k.text !== "")?.length;
    return (
      <Timeline.Item key={kr?.krsId}>
        <Row justify="space-between" align="middle">
          <Col span={8}>
            <Typography.Text>{kr?.keyResult}</Typography.Text>
          </Col>
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
          />
          <Col span={2}>
            <Button type="text" onClick={setKr(kr, okrObjectiveId)}>
              <Badge count={comments} size="small">
                <CommentsIcon />
              </Badge>
            </Button>
          </Col>
        </Row>
      </Timeline.Item>
    );
  };

  const getComment = useMemo(() => {
    const krData = isCompany ? companyData : data;
    for (let item of krData?.okrs) {
      if (item?.okrObjectiveId === currentId.currentOkrId) {
        for (let element of item?.krs) {
          if (element?.krsId === currentId.currentKrId) {
            return element;
          }
        }
        break;
      }
    }
  }, [currentId, data, companyData,isCompany]);

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
      // setCurrentQuarter(currentQuarter[0]?._id);
    }
  }, [timePeriods]);

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
      {/* {loading ? (
        <>
          {new Array(4).fill(0).map((_) => (
            <Skeleton
              active={loading}
              round
              avatar
              paragraph={{ rows: 1 }}
              loading={loading}
            />
          ))}
        </>
      ) : ( */}
      {loading && <Loading />}
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {(isCompany ? companyData : data)?.okrs?.map((okr: OkrElement) => (
          <Collapse.Panel
            key={okr.okrObjectiveId}
            header={<PanelHeader okr={okr} />}
            extra={<PanelExtra okr={okr} />}
          >
            <StyledTimeline>
              {okr?.krs?.map((kr: Kr) => (
                <PanelItem
                  kr={kr}
                  okrOwnerId={okr?.okrOwner?._id}
                  okrObjectiveId={okr?.okrObjectiveId}
                />
              ))}
            </StyledTimeline>
          </Collapse.Panel>
        ))}
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
      </Collapse>
      {/* )} */}
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

const StyledPanelItem = styled.div`
  width: 500px;
  height: 20px;
  display: flex;
  align-items: center;
`;

const InfoIcon = styled(InfoCircleOutlined)`
  margin-right: 10px;
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 20px;
`;

const CommentsIcon = styled(CommentOutlined)`
  font-size: 16px;
`;

const StyledSelect = styled(Select)`
  min-width: 350px;
`;

const StyledTimeline = styled(Timeline)`
  margin-left: 50px;
  margin-top: 20px;
`;
