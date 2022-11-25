import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Table,
  PageHeader,
  Dropdown,
  Menu,
  Typography,
  Avatar,
  Popover,
  Space,
  Form,
  Popconfirm,
} from "antd";
import {
  BankOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LoginOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import {
  CreateOrgModal,
  DeleteOrgModal,
  EditableCell,
  Logo,
} from "./components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getOrganizationListAsync,
  organization,
  updateOrganizationAsync,
} from "./organizationSlice";
import { ROUTES } from "../../utils/routes.enum";
import { COMPANY_ID } from "../../utils/constants";

type OrganizationProps = {};

// interface DataType {
//   key: string;
//   name: string;
//   email: string;
//   location: string;
//   contactNumber: Number;
//   contactPerson: string;
// }

const { Text, Link } = Typography;

const Organization: React.FC<OrganizationProps> = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const [currentRow, setCurrentRow] = useState<any>({});
  const [editingKey, setEditingKey] = useState("");
  const { status, listOfOrg } = useAppSelector(organization);
  const loading = status === "loading";
  const isEditing = (record: any) => record === editingKey;

  const onEdit = (record: any) => {
    form.setFieldsValue({
      orgName: record?.orgName,
      adminEmail: record?.adminEmail,
      location: record?.location,
      adminPhone: record?.adminPhone,
      adminName: record?.adminName,
      ...record,
    });
    setEditingKey(record);
  };

  const onSave = async (record: any) => {
    try {
      let res;
      const row = (await form.validateFields()) as any;
      Object.assign(row, { _id: record?._id });
      res = await dispatch(updateOrganizationAsync(row));
      if (res.payload.status === "success") {
        await dispatch(getOrganizationListAsync());
        setEditingKey("");
      }
    } catch (error) {}
  };

  const onClickViewOrgDetails = (record: any) => {
    localStorage.setItem(
      COMPANY_ID,
      JSON.stringify({
        id: record?._id,
        logoUrl: record?.logoUrl,
        orgName: record?.orgName,
      })
    );
    window.location.replace(ROUTES.HOME);
  };

  const menuItems = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      onClick: (record: any) => () => {
        onEdit(record);
      },
    },
    {
      title: "Sign In",
      icon: <LoginOutlined />,
      onClick: (record: any) => () => {
        setCurrentRow(record);
        onClickViewOrgDetails(record);
      },
    },
    {
      title: "Deactivate",
      icon: <DeleteOutlined />,
      onClick: (record: any) => () => {
        setVisibleDelModal(true);
        setCurrentRow(record);
      },
    },
  ];

  const onCancelEdit = () => {
    setEditingKey("");
  };

  const handleCreateModal = () => {
    setVisible(true);
  };

  const columns = [
    {
      title: "#",
      // dataIndex: "slNo",
      key: "index",
      // render: (value: any, item: any, slNo: any) => slNo + 1,
      render: (text: string, record: any, index: number) =>
        (page - 1) * paginationSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "orgName",
      key: "orgName",
      editable: true,
      // width:100,
      render: (_: any, record: any) => (
        <Space>
          <Popover
            content={
              <Logo
                logo={record?.logo ? record?.logo : ""}
                logoUrl={record?.logoUrl ? record.logoUrl : ""}
                orgId={record?._id}
              />
            }
            placement="rightBottom"
          >
            {record?.logoUrl ? (
              <Avatar src={record?.logoUrl} size="large" />
            ) : (
              <Avatar icon={<BankOutlined />} />
            )}
          </Popover>
          <Text>{record?.orgName}</Text>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "adminEmail",
      key: "adminEmail",
      editable: true,
      width: 275,
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      editable: true,
      // width:150
    },
    {
      title: "Contact Number",
      dataIndex: "adminPhone",
      key: "adminPhone",
      editable: true,
      // width:200
    },
    {
      title: "Contact Person",
      dataIndex: "adminName",
      key: "adminName",
      editable: true,
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Popconfirm title="Sure to save?" onConfirm={() => onSave(record)}>
              <Link>
                <CheckCircleOutlined
                  title="Save"
                  style={{ color: "#52c41a" }}
                />
              </Link>
            </Popconfirm>
            <Link onClick={onCancelEdit}>
              <CloseCircleOutlined title="Close" style={{ color: "#ff4d4f" }} />
            </Link>
          </Space>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                {menuItems.map((item) => (
                  <Menu.Item
                    key={item.title}
                    icon={item.icon}
                    onClick={item.onClick(record)}
                    danger={item.title === "Deactivate"}
                  >
                    {item.title}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <MoreIcon />
          </Dropdown>
        );
      },
    },
  ];

  const customColumns = columns.map((col) => {
    // @ts-ignore
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        // inputType: col.dataIndex === "adminPhone" ? "number" : "text",
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    dispatch(getOrganizationListAsync());
  }, [dispatch]);

  return (
    <Container>
      {visible && <CreateOrgModal visible={visible} setVisible={setVisible} />}
      {visibleDelModal && (
        <DeleteOrgModal
          visible={visibleDelModal}
          setVisible={setVisibleDelModal}
          record={currentRow}
        />
      )}
      <PageHeader
        title="Organization List"
        extra={[
          <Button
            type="primary"
            onClick={handleCreateModal}
            style={{ whiteSpace: "normal", height: "auto" }}
            data-testid="add-org-btn"
          >
            Add Organization
          </Button>,
        ]}
      />
      <StyledDiv>
        <Form form={form} component={false}>
          <Table
            columns={customColumns}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={listOfOrg}
            loading={loading}
            scroll={{ x: true, scrollToFirstRowOnChange: true }}
            pagination={{
              onChange(page, pageSize) {
                setPage(page);
                setPaginationSize(pageSize);
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0;
              },
              defaultPageSize: 10,
              showSizeChanger: true,
            }}
            // scrollToFirstRowOnChange={true}
            rowClassName="editable-row"
          />
        </Form>
      </StyledDiv>
    </Container>
  );
};

export default Organization;

const Container = styled.div`
  padding: 30px;
  width: 100%;

  @media screen and (max-width: 576px) {
    padding: 10px;
  }
`;

const StyledDiv = styled.div`
  .ant-table-thead .ant-table-cell {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 20px;
`;
