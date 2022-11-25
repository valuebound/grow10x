import {
  Button,
  Form,
  FormInstance,
  Input,
} from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

type ChangePasswordFormProps = {
  form: FormInstance<any>;
  onSubmit: any;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  form,
  onSubmit,
}) => {
  const location = useLocation();
  const isSetting = location.pathname.includes("setting");

  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  return (
      <Form
        {...layout}
        form={form}
        name="Set Password"
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onSubmit}
        //btnLoading={loading}
        data-testid="setPassword-form"
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          data-testid="setPassword-form-item-password"
        >
          <Input.Password data-testid="setPassword-password-input" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords you entered do not match!")
                );
              },
            }),
          ]}
          data-testid="setPassword-form-item-confirmPass"
        >
          <Input.Password data-testid="setPassword-confirmPass-input" />
        </Form.Item>
        <Form.Item {...tailLayout} data-testid="setPassword-form-item-button">
          <Button
            type="primary"
            htmlType="submit"
            block={true}
            data-testid="setPassword-submit-btn"
          >
            {isSetting ? "Update Password" : "Set Password"}
          </Button>
        </Form.Item>
      </Form>
  );
};

export default ChangePasswordForm;

