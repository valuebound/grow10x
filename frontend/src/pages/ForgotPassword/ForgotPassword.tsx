import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { Otp } from "./components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyEmailAsync, forgotPassword } from "./forgotPasswordSlice";
import { FormBuilder } from "../../components";
import { MailOutlined } from "@ant-design/icons";
import ForgetPasswordBanner from "../../assets/forgot_password.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes.enum";

type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const dispatch = useAppDispatch();
  const { emailStatus } = useAppSelector(forgotPassword);
  const loading = emailStatus === "loading";
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const onFinish = (values: any) => {
    setEmail(values?.email);
    dispatch(verifyEmailAsync(values?.email)).then((e: any) => {
      if (e?.payload?.code === 200 && e?.payload?.status === "success")
        setOtpModalOpen(true);
    });
  };

  return (
    <Container>
      <LeftHalf>
        <Space direction="vertical">
          <img
            alt="person entering door"
            src={ForgetPasswordBanner}
            width={"90%"}
            style={{ maxWidth: 400 }}
            data-testid="setPassword-banner-img"
          />
          <Typography.Title style={{ color: "white" }}>
            Forgotten password?
          </Typography.Title>
          <Typography.Title level={3} style={{ color: "white" }}>
            Search with your email
          </Typography.Title>
        </Space>
      </LeftHalf>
      {otpModalOpen && (
        <Otp
          otpModalOpen={otpModalOpen}
          setOtpModalOpen={setOtpModalOpen}
          email={email}
        />
      )}
      <RightHalf>
        <FormContainer>
          <FormBuilder
            name="Login"
            width={"100%"}
            btnLoading={loading}
            btnBlock
            onFinish={onFinish}
            submitButtonTitle="Search"
            formItems={[
              {
                initialValue: null,
                label: "Email",
                name: "email",
                rules: [{ required: true, type: "email" }],
                type: {
                  name: "input",
                  props: {
                    placeholder: "Enter you email",
                    prefix: <MailOutlined />,
                  },
                },
              },
            ]}
          />
          <Divider>OR</Divider>
        </FormContainer>
        <Link to={`/${ROUTES.LOGIN}`}>
          <Button>Log In</Button>
        </Link>
      </RightHalf>
    </Container>
  );
};

export default ForgotPassword;

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
