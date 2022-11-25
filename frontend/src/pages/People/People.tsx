import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Menu,
  PageHeader,
  Progress,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Input,
  Tooltip,
  Avatar,
  Typography,
  Col,
  Row,
  Popover,
  List,
  Divider,
} from "antd";
import { debounce, startCase } from "lodash";
import styled from "styled-components";
import {
  CheckCircleTwoTone,
  DownloadOutlined,
  EditFilled,
  MailOutlined,
  MobileOutlined,
  MoreOutlined,
  SearchOutlined,
  UserDeleteOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { getPeople, selectPeople, searchUser } from "./peopleSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  DeactivateMember,
  MemberForm,
  OKRProgress,
  UpdateMember,
  UploadMembers,
  DeleteMember,
  OrgChart,
} from "./components";
import {
  currentUser,
  getCompanyId,
  getProgressColorPro,
  getStatusColor,
  getStatusColorPro,
  ROLES,
  USER_KEY_CONSTANT,
} from "../../utils/constants";
import ActivateMember from "./components/ActivateMember";
import { CustomizedRole, PopoverContent, StatusEmojis } from "../../components";
import LocationIcon from "../../assets/location_on_icon.svg";

type PeopleProps = {};

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text, Link, Paragraph } = Typography;

const People: React.FC<PeopleProps> = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectPeople);
  const loading = status === "loading";
  const companyId = getCompanyId()?.id?.length > 0;
  const isAdmin =
    currentUser?.role === ROLES.ADMIN ||
    (currentUser?.role === ROLES.SUPER_ADMIN && companyId);

  const [openMemberForm, setOpenMemberForm] = useState<boolean>(false);
  const [updateMember, setUpdateMember] = useState<boolean>(false);
  const [deactivateMember, setDeactivateMember] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>({});
  const [openOKRProgress, setOpenOKRProgress] = useState<boolean>(false);
  const [userType, setUserType] = useState("active");
  const [activeTab, setActiveTab] = useState("People");
  const [deleteMember, setDeleteMember] = useState<boolean>(false);
  const [activateMember, setActivateMember] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10); //your current default pagination size 10
  const [searchInput, setSearchInput] = useState<string>("");

  const onCreateMember = () => setOpenMemberForm(true);
  const closeMemberForm = () => setOpenMemberForm(false);
  const onCloseUpdateMember = () => setUpdateMember(false);
  const onCloseDeactivateMember = () => setDeactivateMember(false);
  const showUserOkrs = (record: any) => () => {
    setCurrentRow(record);
    setOpenOKRProgress(true);
  };
  const onCloseOKR_Progress = () => setOpenOKRProgress(false);
  const onCloseDeleteMember = () => setDeleteMember(false);
  const onCloseActivateMember = () => setActivateMember(false);

  const userDetails = JSON.parse(
    String(localStorage.getItem(USER_KEY_CONSTANT))
  );

  const onSearchChange = (e: any) => {
    if (e?.target?.value?.length > 2 && page != 1) {
      setPage(1);
      setPaginationSize(10);
    }
    setSearchInput(e.target.value);
  };

  const onSearch = (searchQuery: string) => {
    const searchData = { searchQuery, status: userType === "active" };
    // dispatch(searchUser(searchData));
  };

  const onChangeUserType = (value: string) => {
    setPage(1);
    setPaginationSize(10);
    setUserType(value);
  };

  let menuItems: any = [
    // {
    //   title: "Delete",
    //   icon: <DeleteFilled />,
    //   onClick: (record: any) => () => {
    //     setDeleteMember(true);
    //     setCurrentRow(record);
    //   },
    // },
  ];
  if (userType === "active") {
    menuItems = [
      {
        title: "Edit",
        icon: <EditFilled />,
        onClick: (record: any) => () => {
          setUpdateMember(true);
          setCurrentRow(record);
        },
      },
      {
        title: "Deactivate",
        icon: <UserDeleteOutlined />,
        onClick: (record: any) => () => {
          setDeactivateMember(true);
          setCurrentRow(record);
        },
      },
    ];
  } else {
    menuItems = [
      {
        title: "Activate",
        icon: <UserDeleteOutlined />,
        onClick: (record: any) => () => {
          setActivateMember(true);
          setCurrentRow(record);
        },
      },
    ];
  }

  let columns = [
    {
      title: "#",
      key: "index",
      render: (text: string, record: any, index: number) =>
        (page - 1) * paginationSize + index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "firstName",
      render: (_: any, record: any) => (
        <Space>
          {/* <Link onClick={showUserOkrs(record)}> */}
          <Popover
            content={
              <PopoverContent
                avatar={record?.avatar || ""}
                firstName={record?.firstName || ""}
                surname={record?.surname || ""}
                email={record?.email || ""}
                designation={""}
                phone={record?.phone || ""}
                location={record?.location || ""}
              />
            }
          >
            <Avatar
              alt={`${record?.firstName}${record?.surname}`}
              size="large"
              src={record?.avatar}
              onError={() => false}
            />
          </Popover>
          {/* </Link> */}
          <Space size={1} direction="vertical">
            <Text>{`${record?.firstName} ${record?.surname}`}</Text>
            <Text type="secondary">{record?.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Managers",
      dataIndex: "reportingManager",
      key: "reportingManager",
      render: (text: any, record: any) => (
        <>
          {record?.reportingManager ? (
            <Space size="small">
              {/* <Tooltip
                title={`${record?.reportingManager?.firstName} ${record?.reportingManager?.surname}`}
              > */}
              <Popover
                content={
                  <PopoverContent
                    avatar={record?.reportingManager?.avatar || ""}
                    firstName={record?.reportingManager?.firstName || ""}
                    surname={record?.reportingManager?.surname || ""}
                    email={record?.reportingManager?.email || ""}
                    designation={record?.reportingManager?.designation || ""}
                    phone={record?.reportingManager?.phone || ""}
                    location={record?.reportingManager?.location || ""}
                  />
                }
              >
                <Link onClick={showUserOkrs(record?.reportingManager)}>
                  <Avatar
                    alt={`${record?.reportingManager?.firstName}${record?.reportingManager?.surname}`}
                    size="large"
                    src={record?.reportingManager?.avatar}
                    onError={() => false}
                  />
                </Link>
              </Popover>
              {/* </Tooltip> */}
            </Space>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "Overall Progress",
      dataIndex: "okrStats",
      key: "okrStats",
      render: (_: any, record: any) => (
        <Link onClick={showUserOkrs(record)}>
          <Space>
            <div style={{ width: "35px" }}>
              {`${record?.okrStats?.overallProgress || 0}%`}
            </div>
            <Text
              style={{
                color: getStatusColorPro(record?.okrStats?.overallStatus),
              }}
            >
              {/* {statusEmojis(record?.okrStats?.overallStatus)} */}
              <StatusEmojis overallStatus={record?.okrStats?.overallStatus} />
              {startCase(
                `${record?.okrStats?.overallStatus || "Not Started!"}`
              )}
            </Text>
          </Space>
          <Progress
            strokeColor={getProgressColorPro(record?.okrStats?.overallStatus)}
            percent={record?.okrStats?.overallProgress}
            size="small"
            showInfo={false}
          />
        </Link>
      ),
    },
    {
      title: "Access Level",
      dataIndex: "role",
      key: "role",
      render: (record: any) => <CustomizedRole role={record?.role} />,
    },
  ];

  let pageActions: any[] = [
    <Row justify="space-between" gutter={[0, 16]}>
      <Col md={9} xs={24}>
        <Space direction="vertical" size={0}>
          <SearchInput
            placeholder="Type name to search"
            onChange={onSearchChange}
            allowClear
            prefix={<SearchOutlined />}
          />
          <Text italic type="warning" ellipsis style={{ fontSize: "10px" }}>
            (At least 3 characters are required to search)
          </Text>
        </Space>
      </Col>
      {isAdmin && (
        <Col md={9} xs={24}>
          <Space>
            <UploadMembers
              userType={userType}
              page={page}
              paginationSize={paginationSize}
            />
            <Tooltip title="Download Template File">
              <Button
                type="default"
                href={require("../../assets/Template_File.csv")}
                target="_blank"
                icon={<DownloadOutlined />}
              />
            </Tooltip>
          </Space>
        </Col>
      )}
      {isAdmin && (
        <Col md={5} xs={24}>
          <Button type="primary" onClick={onCreateMember}>
            Add Members
          </Button>
        </Col>
      )}
    </Row>,
  ];

  if (isAdmin) {
    columns = [
      ...columns,
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: any) => (
          <>
            {isAdmin && //todo condition can be removed. need to check
              (userDetails?.userid !== record?._id ? (
                <Dropdown
                  overlay={
                    <Menu>
                      {menuItems.map((item: any) => (
                        <Menu.Item
                          key={item.title}
                          icon={item.icon}
                          // disabled={
                          //   !(item.title === "Delete") &&
                          //   record?.isActive === false
                          // }
                          danger={item.title === "Delete"}
                          onClick={item.onClick(record)}
                        >
                          {item.title}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <MoreIcon />
                </Dropdown>
              ) : (
                <StyledTag>It's You</StyledTag>
              ))}
          </>
        ),
      },
    ];

    pageActions = [...pageActions];
  }

  const UserTypeBlock = () => {
    return (
      <StyledSpacer>
        <Text>Status</Text>
        <Select
          defaultValue="active"
          value={userType}
          onChange={(value) => onChangeUserType(value)}
          style={{ width: 100 }}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </StyledSpacer>
    );
  };

  const profileList = [
    { title: "phone", icon: <MobileOutlined /> },
    {
      title: "location",
      icon: <img src={LocationIcon} width={14} height={14} />,
    },
    {
      title: "reportingManager",
      icon: <UserOutlined />,
    },
  ];

  const okrList = [
    { title: "totalObjective", color: "orange" },
    { title: "totalKrs", color: "orange" },
    { title: "objectiveAtRisk", color: "red" },
    { title: "objectiveBehind", color: "yellow" },
    { title: "objectiveDone", color: "green" },
    { title: "objectiveOnTrack", color: "orange" },
  ];

  const Profile = ({ record }: any) => (
    <Row gutter={[16, 16]}>
      <Col span={16}>
        <List
          header={
            <Row>
              <Col span={5}>
                <Avatar
                  alt={`${record?.firstName}${record?.surname}`}
                  size={75}
                  src={record?.avatar}
                  onError={() => false}
                />
              </Col>
              <Col span={19}>
                <Title
                  level={4}
                >{`${record?.firstName} ${record?.surname}`}</Title>
                <Space align="start" style={{ width: "100%" }}>
                  <MailOutlined />
                  <Text>
                    {record?.email || (
                      <Text italic disabled>
                        Not Updated
                      </Text>
                    )}
                  </Text>
                </Space>
                <Space align="start" style={{ width: "100%" }}>
                  <WalletOutlined />
                  <Text>
                    {record?.designation || (
                      <Text italic disabled>
                        Not Updated
                      </Text>
                    )}
                  </Text>
                </Space>
              </Col>
            </Row>
          }
          size="small"
          bordered
          dataSource={profileList}
          renderItem={(item) => (
            <List.Item>
              {item.title === "reportingManager" ? (
                <Row style={{ width: "100%" }}>
                  <Col span={8}>
                    <Space align="start" style={{ width: "100%" }}>
                      {item.icon}
                      <Title level={5}>{startCase(item.title)}</Title>
                    </Space>
                  </Col>
                  <Col span={16}>
                    {record?.hasOwnProperty(item.title) ? (
                      <Row>
                        <Col span={5}>
                          <Avatar
                            alt={`${record[item.title]?.firstName}${
                              record[item.title]?.surname
                            }`}
                            size={50}
                            src={record[item.title]?.avatar}
                            onError={() => false}
                          />
                        </Col>
                        <Col span={19}>
                          <Title level={4}>{`${record[item.title]?.firstName} ${
                            record[item.title]?.surname
                          }`}</Title>
                          <Space align="start" style={{ width: "100%" }}>
                            <MailOutlined />
                            <Text>
                              {record[item.title]?.email || (
                                <Text italic disabled>
                                  Not Updated
                                </Text>
                              )}
                            </Text>
                          </Space>
                          <Space align="start" style={{ width: "100%" }}>
                            <WalletOutlined />
                            <Text>
                              {record[item.title]?.designation || (
                                <Text italic disabled>
                                  Not Updated
                                </Text>
                              )}
                            </Text>
                          </Space>
                          <Space align="start" style={{ width: "100%" }}>
                            <MobileOutlined />
                            <Text>
                              {record[item.title]?.phone || (
                                <Text italic disabled>
                                  Not Updated
                                </Text>
                              )}
                            </Text>
                          </Space>
                        </Col>
                      </Row>
                    ) : (
                      <Text italic disabled>
                        NA
                      </Text>
                    )}
                  </Col>
                </Row>
              ) : (
                <Row style={{ width: "100%" }}>
                  <Col span={4}>
                    <Space align="start" style={{ width: "100%" }}>
                      {item.icon}
                      <Title level={5}>{startCase(item.title)}</Title>
                    </Space>
                  </Col>
                  <Col span={18}>
                    {(record?.hasOwnProperty(item.title) &&
                      record[item.title]) || (
                      <Text italic disabled>
                        Not Updated
                      </Text>
                    )}
                  </Col>
                </Row>
              )}
            </List.Item>
          )}
        ></List>
      </Col>
      <Col span={8}>
        {/* <Title level={5} style={{ textAlign: "center" }}>
          OKR Status
        </Title> */}
        <List
          size="small"
          loading={loading}
          itemLayout="horizontal"
          bordered
          header={
            <Row>
              <Space>
                <div style={{ width: "35px" }}>
                  {`${record?.okrStats?.overallProgress || 0}%`}
                </div>
                <Text
                  style={{
                    color: getStatusColorPro(record?.okrStats?.overallStatus),
                  }}
                >
                  <StatusEmojis
                    overallStatus={record?.okrStats?.overallStatus}
                  />
                  {startCase(
                    `${record?.okrStats?.overallStatus || "Not Started!"}`
                  )}
                </Text>
              </Space>
              <Progress
                strokeColor={getProgressColorPro(
                  record?.okrStats?.overallStatus
                )}
                percent={record?.okrStats?.overallProgress}
                size="small"
                showInfo={false}
              />
            </Row>
          }
          dataSource={okrList}
          renderItem={(listItem: any) => (
            <List.Item
              actions={[
                <Typography.Text>
                  {(record?.okrStats?.hasOwnProperty(listItem.title) &&
                    record?.okrStats[listItem.title]) ||
                    0}
                </Typography.Text>,
              ]}
            >
              <List.Item.Meta
                title={startCase(listItem.title)}
                avatar={<CheckCircleTwoTone twoToneColor={listItem.color} />}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );

  const debouncedSearch = debounce(async (queryData) => {
    await dispatch(searchUser(queryData));
  }, 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (activeTab === "People") {
      const queryData = { page, paginationSize, status: userType === "active" };
      if (searchInput.length > 0) {
        if (searchInput.length > 2) {
          //@ts-ignore
          queryData.searchQuery = searchInput;
          debouncedSearch(queryData);
          // setPage(1);
        }
      } else dispatch(getPeople(queryData));
    }
  }, [dispatch, userType, activeTab, page, paginationSize, searchInput]);

  return (
    <>
      <Container>
        <PageHeader
          title="People"
          extra={activeTab === "People" && pageActions}
        />
        <StyledTabs
          size="large"
          onChange={(activeKey) => setActiveTab(activeKey)}
        >
          <TabPane key="People" tab={`People (${data?.count || 0})`}>
            {isAdmin && <UserTypeBlock />}
            <StyledDiv>
              <Table
                columns={columns}
                dataSource={data?.allMembers}
                loading={loading}
                rowKey={(record: any) => record?._id}
                expandable={{
                  expandedRowRender: (record) => <Profile record={record} />,
                }}
                expandRowByClick={true}
                pagination={{
                  onChange(page, pageSize) {
                    setPage(page);
                    setPaginationSize(pageSize);
                  },
                  current: page,
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  total: data?.count,
                }}
                scroll={{ x: 500 }}
              />
            </StyledDiv>
            {openMemberForm && (
              <MemberForm
                open={openMemberForm}
                onClose={closeMemberForm}
                userType={userType}
                page={page}
                paginationSize={paginationSize}
              />
            )}
            {openOKRProgress && (
              <OKRProgress
                open={openOKRProgress}
                onClose={onCloseOKR_Progress}
                row={currentRow}
              />
            )}
            {updateMember && (
              <UpdateMember
                open={updateMember}
                onClose={onCloseUpdateMember}
                row={currentRow}
                userType={userType}
                page={page}
                paginationSize={paginationSize}
              />
            )}
            {deactivateMember && (
              <DeactivateMember
                open={deactivateMember}
                onClose={onCloseDeactivateMember}
                id={currentRow?._id}
                userType={userType}
                page={page}
                paginationSize={paginationSize}
              />
            )}
            {deleteMember && (
              <DeleteMember
                open={deleteMember}
                onClose={onCloseDeleteMember}
                id={currentRow?._id}
                userType={userType}
              />
            )}
            {activateMember && (
              <ActivateMember
                open={activateMember}
                onClose={onCloseActivateMember}
                id={currentRow?._id}
                userType={userType}
                page={page}
                paginationSize={paginationSize}
              />
            )}
          </TabPane>
          <TabPane key="Organization" tab="Organization">
            {activeTab === "Organization" && <OrgChart activeTab={activeTab} />}
          </TabPane>
        </StyledTabs>
      </Container>
    </>
  );
};

export default People;

const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

const SearchInput = styled(Input)`
  max-width: 300px;
`;

const StyledTabs = styled(Tabs)`
  margin: 0 20px;
`;

const StyledSpacer = styled(Space)`
  width: 100%;
  margin-bottom: 15px;
  justify-content: flex-end;
`;

const StyledDiv = styled.div`
  .ant-table-thead .ant-table-cell {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;

const StyledTag = styled(Tag)`
  background-color: #002140;
  color: white;
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 20px;
`;
