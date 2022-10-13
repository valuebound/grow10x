import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Button, Table, PageHeader, Dropdown, Menu } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";

import { CreateOrgModal, DeleteOrgModal } from "./components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getOrganizationListAsync, organization } from "./organizationSlice";

type OrganizationProps = {};

interface DataType {
  key: string;
  name: string;
  email: string;
  location: string;
  contactNumber: Number;
  contactPerson: string;
}

const Organization: React.FC<OrganizationProps> = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const [currentRow, setCurrentRow] = useState<any>({});
  const { status, error, listOfOrg } = useAppSelector(organization);
  const loading = status === "loading";

  const menuItems = [
    {
      title: "Deactivate",
      icon: <DeleteOutlined />,
      onClick: (record: any) => () => {
        setVisibleDelModal(true);
        setCurrentRow(record);
      },
    },
  ];

  const handleCreateModal = () => {
    setVisible(true);
  };

  const columns: ColumnsType<DataType> = [
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
      key: "name",
      // width:100,
    },
    {
      title: "Email",
      dataIndex: "adminEmail",
      key: "Email",
      width: 275,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "Location",
      // width:150
    },
    {
      title: "Contact Number",
      dataIndex: "adminPhone",
      key: "contactNumber",
      // width:200
    },
    {
      title: "Contact Person",
      dataIndex: "adminName",
      key: "contactPerson",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_: any, record: any) => (
        <>
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
            <MoreOutlined />
          </Dropdown>
        </>
      ),
    },
  ];

  useLayoutEffect(() => {
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
        <Table
          columns={columns}
          dataSource={listOfOrg}
          loading={loading}
          pagination={{
            onChange(page, pageSize) {
              setPage(page);
              setPaginationSize(pageSize);
            },
            defaultPageSize: 10,
            showSizeChanger: true,
          }}
        />
      </StyledDiv>
    </Container>
  );
};

export default Organization;

const Container = styled.div`
  padding: 30px;
  width: 100%;
`;

const StyledDiv = styled.div`
  .ant-table-thead .ant-table-cell {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;
