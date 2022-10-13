import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Switch,
} from "antd";
import moment from "moment";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMyProfile, selectProfile, updateSelfProfile } from "./profileSlice";
import Loading from "../../components/Loading";

type ProfileProps = {};

const { Option } = Select;
const { Item } = Form;

const Profile: React.FC<ProfileProps> = () => {
  const { data } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const [canLoad, setCanLoad] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [disableButton, setDisableButton] = useState(true);

  const dateFormat = "YYYY-MM-DD";

  const onEditModeChange = (checked: boolean) => {
    setEditMode(!checked);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (
      allValues?.firstName !== data?.firstName ||
      allValues?.surname !== data?.surname ||
      allValues?.userName !== data?.userName ||
      allValues?.email !== data?.email ||
      allValues?.phone !== data?.phone ||
      allValues?.gender !== data?.gender ||
      JSON.stringify(allValues?.dob) !== JSON.stringify(data?.dob) ||
      allValues?.designation !== data?.designation
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }

    // if (JSON.stringify(allValues) !== JSON.stringify(data))
    //   setDisableButton(false);
    // else setDisableButton(true);
  };

  const onFinish = (values: any) => {
    setConfirmLoading(true);
    dispatch(updateSelfProfile(values));
    setConfirmLoading(false);
    setEditMode(true);
  };

  useEffect(() => {
    dispatch(getMyProfile({})).then(() => setCanLoad(true));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        title="Profile"
        extra={[
          <Switch
            checked={!editMode}
            onChange={onEditModeChange}
            checkedChildren="Edit Mode"
            unCheckedChildren="View"
            title="Edit Mode"
          />,
        ]}
      />
      <div style={{ display: "flex" }}>
        {/* <StyledCard>
          <Space direction="vertical">
            <StyledAvatar size={{ xl: 80 }}>
              {data?.firstName}
              {data?.surname}
            </StyledAvatar>
            <Title level={3}>
              Hello, {`${data?.firstName} ${data?.surname}`}
            </Title>
            <Paragraph>We can put bio here</Paragraph>
            <Paragraph strong>
              This space is proposed to be added, waiting for the green signal
              from management
            </Paragraph>
          </Space>
        </StyledCard> */}
        <Card style={{ width: "100%" }}>
          {canLoad ? (
            <Form
              wrapperCol={{ span: 24 }}
              layout="vertical"
              initialValues={{
                _id: data?._id,
                firstName: data?.firstName,
                surname: data?.surname,
                userName: data?.userName,
                email: data?.email,
                phone: data?.phone,
                gender: data?.gender,
                dob: moment(data?.dob),
                designation: data?.designation,
                // projectDetails: data?.projectDetails,
                reportingManager: `${data?.reportingManager?.firstName || ""} ${
                  data?.reportingManager?.surname || ""
                }`,
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
                gutter={[24, 16]}
              >
                <StyledCol xs={{ span: 24 }} md={{ span: 12 }}>
                  <Item name="_id" style={{ display: "none" }}>
                    <Input type="hidden" />
                  </Item>
                  <Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is required!" },
                      {
                        min: 3,
                        message: "First name must be at least 3 characters",
                      },
                    ]}
                  >
                    <Input disabled={editMode} prefix={<UserOutlined />} />
                  </Item>
                  <Item
                    label="Last Name"
                    name="surname"
                    rules={[
                      { required: true, message: "Last name is required!" },
                      {
                        min: 1,
                        message: "Last name must be at least 1 characters",
                      },
                    ]}
                  >
                    <Input disabled={editMode} prefix={<UserOutlined />} />
                  </Item>
                  <Item label="Working Email" name="email">
                    <Input
                      disabled={
                        data?.role?.role === "USER" ||
                        data?.role?.role === "ADMIN" ||
                        editMode
                      }
                      prefix={<MailOutlined />}
                    />
                  </Item>
                  <Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        len: 10,
                        message: "Phone must be 10 digits",
                      },
                      {
                        pattern: new RegExp(/[6-9]{1}[0-9]{9}/),
                        message: "Phone must be a valid contact number",
                      },
                    ]}
                  >
                    <Input
                      allowClear
                      disabled={editMode}
                      prefix={<PhoneOutlined />}
                    />
                  </Item>
                </StyledCol>
                <StyledCol xs={{ span: 24 }} md={{ span: 12 }}>
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
                    <Input disabled={editMode} prefix={<UserOutlined />} />
                  </Item>
                  <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                      <Item label="Date of Birth" name="dob">
                        <DatePicker
                          placeholder="Date Of Birth"
                          format={dateFormat}
                          disabled={editMode}
                          style={{ width: "100%" }}
                        />
                      </Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                      <Item label="Gender" name="gender">
                        <Select
                          style={{ width: "100%" }}
                          defaultValue={{
                            value: "gender",
                            label: "Select Gender",
                          }}
                          disabled={editMode}
                          allowClear
                        >
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                        </Select>
                      </Item>
                    </Col>
                  </Row>
                  <Item label="Designation" name="designation">
                    <Input
                      disabled={data?.role?.role === "USER" || editMode}
                      prefix={<WalletOutlined />}
                    />
                  </Item>
                  <Item label="Reporting Manager" name="reportingManager">
                    <Input
                      disabled={
                        data?.role?.role === "USER" ||
                        data?.role?.role === "ADMIN" ||
                        editMode
                      }
                      allowClear
                      prefix={<UserOutlined />}
                    />
                  </Item>
                </StyledCol>
              </Row>
              <Item wrapperCol={{ offset: 25, span: 20 }}>
                {!editMode && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="middle"
                    loading={confirmLoading}
                    disabled={disableButton}
                  >
                    Update
                  </Button>
                )}
              </Item>
            </Form>
          ) : (
            <Loading />
          )}
        </Card>
      </div>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #293241;
`;

const StyledCol = styled(Col)`
  border-radius: 10px;
`;

const StyledCard = styled(Card)`
  width: 25%;
  background-color: transparent;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;
