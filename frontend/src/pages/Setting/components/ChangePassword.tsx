import { LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changePasswordAsync, setting } from "../settingSlice";

type ChangePasswordProps = {};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector(setting);
  const loading = status === "loading";

  const onSubmit = (values: any) => {
    dispatch(changePasswordAsync(values)).then((e: any) => {
      if (e?.payload?.code === 200 && e?.payload?.status === "success")
        form.resetFields();
    });
  };

  return (
    <Row gutter={[8,8]}>
      <Col md={8} sm={24} xs={24}>
        <Typography.Title level={5}>Change Password</Typography.Title>
        <Typography.Paragraph>
          Change your password by entering your old password, new password and
          confirm password
        </Typography.Paragraph>
      </Col>
      <Col lg={10} md={16} sm={24} xs={24}>
        <Form
          form={form}
          name="Set Password"
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onSubmit}
          data-testid="setPassword-form"
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter Old Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter New Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter Confirm Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
