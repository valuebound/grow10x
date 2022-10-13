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
} from "antd";
import { debounce, startCase, toLower } from "lodash";
import styled from "styled-components";
import {
  DownloadOutlined,
  EditFilled,
  MoreOutlined,
  UserDeleteOutlined,
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
  OrgChartUsingDiv,
} from "./components";
import {
  currentUser,
  getProgressColorByStatus,
  getProgressColorPro,
  getStatusColor,
  getStatusColorPro,
  ROLES,
  USER_KEY_CONSTANT,
} from "../../utils/constants";
import ActivateMember from "./components/ActivateMember";

type PeopleProps = {};

const { TabPane } = Tabs;
const { Option } = Select;
const { Text, Link } = Typography;

const People: React.FC<PeopleProps> = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectPeople);
  const loading = status === "loading";
  const isAdmin = currentUser?.role === ROLES.ADMIN && currentUser?.isAdmin;

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

  const statusEmojis = (overallStatus: any) => {
    return overallStatus === "onTrack" ? (
      <span style={{ color: "transparent", textShadow: "0 0 0 #1890ff" }}>
        👉{" "}
      </span>
    ) : overallStatus === "atRisk" ? (
      <span style={{ color: "transparent", textShadow: "0 0 0 #ff4d4f" }}>
        👉{" "}
      </span>
    ) : overallStatus === "behind" ? (
      <span style={{ color: "transparent", textShadow: "0 0 0 #faad14" }}>
        👉{" "}
      </span>
    ) : overallStatus === "done" ? (
      <span style={{ color: "transparent", textShadow: "0 0 0 #52c41a" }}>
        👉{" "}
      </span>
    ) : (
      <span style={{ color: "transparent", textShadow: "0 0 0 #bfbfbf" }}>
        👉{" "}
      </span>
    );
  };

  const customizedRole = (role: any) => {
    switch (role) {
      case "ADMIN":
        return (
          <Text style={{ color: "#52c41a" }}>{startCase(toLower(role))}</Text>
        );
      case "USER":
        return (
          <Text style={{ color: "#8c8c8c" }}>{startCase(toLower(role))}</Text>
        );

      /* to be implemented later on */
      case "MANAGER":
        return (
          <Text style={{ color: "#faad14" }}>{startCase(toLower(role))}</Text>
        );
      case "HR":
        return (
          <Text style={{ color: "#030852" }}>{startCase(toLower(role))}</Text>
        );
    }
  };
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
          <Link onClick={showUserOkrs(record)}>
            <Avatar
              alt={`${record?.firstName}${record?.surname}`}
              size="large"
              src={record?.avatar}
              onError={() => false}
            />
          </Link>
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
              <Tooltip
                title={`${record?.reportingManager?.firstName} ${record?.reportingManager?.surname}`}
              >
                <Link onClick={showUserOkrs(record?.reportingManager)}>
                  <Avatar
                    alt={`${record?.reportingManager?.firstName}${record?.reportingManager?.surname}`}
                    size="large"
                    src={record?.reportingManager?.avatar}
                    onError={() => false}
                  />
                </Link>
              </Tooltip>
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
              {statusEmojis(record?.okrStats?.overallStatus)}
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
      render: (record: any) => <span>{customizedRole(record?.role)}</span>,
    },
  ];

  let pageActions: any[] = [
    <Row justify="space-between" gutter={[0, 16]}>
      <Col md={9} xs={24}>
        <Space direction="vertical" size={0}>
          <SearchInput
            placeholder="Type name to search"
            onSearch={onSearch}
            onChange={onSearchChange}
            allowClear
            enterButton
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
            {activeTab === "Organization" && (
              <OrgChartUsingDiv activeTab={activeTab} />
            )}
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

const SearchInput = styled(Input.Search)`
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
