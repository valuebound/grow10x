import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Space, Typography, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import FormBuilder from "../../components/FormBuilder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPassword, setPasswordAsync } from "./setPasswordSlice";
import setPasswordImg from "../../assets/setPasswordImg.svg";
import { ROUTES } from "../../utils/routes.enum";

type ChangePasswordProps = {};

const SetPassword: React.FC<ChangePasswordProps> = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, passwordChanged } = useAppSelector(setPassword);
  let { id } = useParams();

  const loading = status === "loading";

  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  useEffect(() => {
    if (passwordChanged) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [passwordChanged, navigate]);

  const onSubmit = (values: any) =>
    dispatch(setPasswordAsync({ inputData: values, id, type: "" }));

  return (
    <Container data-testid="setPassword-container">
      <LeftHalf data-testid="setPassword-left-half">
        <Space direction="vertical" data-testid="setPassword-left-half-space">
          <img
            alt="person entering door"
            src={setPasswordImg}
            width={"90%"}
            style={{ maxWidth: 400 }}
            data-testid="setPassword-banner-img"
          />
          <Typography.Title
            style={{ color: "white" }}
            data-testid="setPassword-banner-title"
          >
            Secure your password
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{ color: "white" }}
            data-testid="setPassword-banner-subTitle"
          >
            Create a strong password
          </Typography.Title>
        </Space>
      </LeftHalf>
      <RightHalf data-testid="setPassword-right-half">
        <FormContainer data-testid="setPassword-form-container">
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
                Set Password
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </RightHalf>
    </Container>
  );
};

export default SetPassword;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;
const LeftHalf = styled.div`
  width: 60%;
  height: 100vh;
  background-color: #293241;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    width: 50%;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
const RightHalf = styled.div`
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    width: 50%;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
const FormContainer = styled.div`
  width: 90%;
  max-width: 400px;
`;
