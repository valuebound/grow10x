import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getPeople,
  getReportingManagerList,
  selectPeople,
  updateMembersProfiles,
} from "../peopleSlice";
import styled from "styled-components";
import { MailOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading";

type UpdateMemberProps = {
  open: boolean;
  onClose: () => void;
  row: any;
  userType: any;
  page: number;
  paginationSize: number;
};

const { Option } = Select;
const { Item } = Form;

const UpdateMember: React.FC<UpdateMemberProps> = ({
  open,
  onClose,
  row,
  userType,
  page,
  paginationSize,
}) => {
  const { reportingMangerList } = useAppSelector(selectPeople);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (
      allValues?.firstName !== row?.firstName ||
      allValues?.surname !== row?.surname ||
      allValues?.designation !== row?.designation ||
      allValues?.userName !== (row?.userName || "") ||
      allValues?.email !== row?.email ||
      allValues?.reportingManager !== row?.reportingManager?._id
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    try {
      let res;
      res = await dispatch(updateMembersProfiles(values));
      if (res.payload.status === "success") {
        const queryData = {
          page,
          paginationSize,
          status: userType === "active",
        };
        await dispatch(getPeople(queryData));
        onClose();
      }
      setConfirmLoading(false);
    } catch (error) {
      console.log("Error Updating Member", error);
    }
  };

  useEffect(() => {
    dispatch(getReportingManagerList(row?._id));
    setCanLoad(true);
  }, [dispatch, row]);

  return (
    <Modal
      title="Update Member"
      width={800}
      visible={open}
      onOk={form.submit}
      okText="Update"
      confirmLoading={confirmLoading}
      onCancel={onClose}
      okButtonProps={{ loading: confirmLoading, disabled: disableButton }}
    >
      {canLoad ? (
        <StyledForm
          form={form}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{
            ...row,
            _id: row?._id,
            firstName: row?.firstName,
            surname: row?.surname,
            designation: row?.designation,
            userName: row?.userName,
            email: row?.email,
            // teams: row?.teams,
            reportingManager: row?.reportingManager?._id,
          }}
          onValuesChange={(changedValues, allValues) =>
            onValuesChange(changedValues, allValues)
          }
          onFinish={onFinish}
          autoComplete="on"
        >
          <Row
            justify="space-between"
            style={{ width: "100%" }}
            gutter={[16, 16]}
          >
            <StyledCol span={10}>
              <Item style={{ display: "none" }} name="_id">
                <Input type="hidden" />
              </Item>
              <Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First Name is mandatory" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
              <Item
                label="Last Name"
                name="surname"
                rules={[{ required: true, message: "Last Name is mandatory" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
              <Item
                label="Email"
                name="email"
                rules={[{ required: false, message: "Optional" }]}
              >
                <Input prefix={<MailOutlined />} />
              </Item>
            </StyledCol>
            <StyledCol span={10}>
              <Item
                label="Username"
                name="userName"
                rules={[
                  {
                    min: 5,
                    max: 25,
                    message: "Username must be between 5 and 25 characters",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
              <Item
                label="Job Title"
                name="designation"
                rules={[
                  {
                    min: 2,
                    max: 30,
                    message: "Designation must be between 2 and 30 characters",
                  },
                ]}
              >
                <Input prefix={<WalletOutlined />} />
              </Item>
              <Item
                label="Reporting Manager"
                name="reportingManager"
                rules={[{ required: false, message: "Optional" }]}
              >
                {/* <Input prefix={<UserOutlined />} /> */}
                {/* TODO: change to input */}
                <Select
                  // defaultActiveFirstOption
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      .toLowerCase()
                      .localeCompare(
                        (optionB!.children as unknown as string).toLowerCase()
                      )
                  }
                  allowClear
                >
                  {reportingMangerList.map((item: any) => (
                    <Option key={item?.id} value={item?.id}>
                      {`${item?.name} ${
                        item?.designation ? `(${item?.designation})` : ""
                      }`}
                    </Option>
                  ))}
                </Select>
              </Item>

              {/* This field is proposed to be used in next sprint */}
              {/* <Item
                label="Teams"
                name="teams"
                rules={[{ required: false, message: "Optional" }]}
              >
                <Input prefix={<TeamOutlined />} />
                <Select>
                  {row?.teams?.map((team: any) => (
                    <Option value={team?._id}>{team?.teamName}</Option>
                  ))}
                </Select>
              </Item> */}
            </StyledCol>
          </Row>
        </StyledForm>
      ) : (
        // <Spin spinning tip="Loading..." size="large"></Spin>
        <Loading />
      )}
    </Modal>
  );
};

export default UpdateMember;

const StyledForm = styled(Form)`
  width: 750px;
  overflow-x: hidden;
`;

const StyledCol = styled(Col)`
  border-radius: 10px;
`;
