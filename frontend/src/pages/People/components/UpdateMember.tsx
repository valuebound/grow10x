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
  const [role, setRole] = useState("ADMIN");

  const { Option } = Select;

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (
      allValues?.firstName !== row?.firstName ||
      allValues?.surname !== row?.surname ||
      allValues?.designation !== row?.designation ||
      allValues?.userName !== (row?.userName || "") ||
      allValues?.email !== row?.email ||
      allValues?.reportingManager !== (row?.reportingManager?._id || "") ||
      allValues?.role !== row?.role?.role
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
    } catch (error) {}
  };

  const onChange = (event: any) => {
    setRole(event);
  };

  const options = ["ADMIN", "USER"];

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
            role: row?.role?.role,
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

              {/* <Item
                label="Role"
                name="role"
                rules={[{ required: false, message: "Optional" }]}
                style={
                  {
                    // width: "100%",
                    // display: "inline-block",
                    // marginLeft: "auto",
                    // marginRight: "auto",
                    // textAlign: "left",
                  }
                }
              >
                <Select
                  placeholder="Add Role"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {options.map((item, index) => {
                    return (
                      <Option key={item}>
                        <div className="demo-option-label-item">{item}</div>
                      </Option>
                    );
                  })}
                </Select>
              </Item> */}
            </StyledCol>
            <StyledCol span={20}>
              <Item
                label="Role"
                name="role"
                rules={[{ required: false, message: "Optional" }]}
                style={
                  {
                    // width: "100%",
                    // display: "inline-block",
                    // marginLeft: "auto",
                    // marginRight: "auto",
                    // textAlign: "left",
                  }
                }
              >
                <Select
                  placeholder="Add Role"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {options.map((item, index) => {
                    return (
                      <Option key={item} value={item}>
                        <div className="demo-option-label-item">{item}</div>
                      </Option>
                    );
                  })}
                </Select>
              </Item>
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
