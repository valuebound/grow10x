import { Button, Form, Input, Modal, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ROUTES } from "../../../utils/routes.enum";
import {
  verifyOtpAsync,
  forgotPassword,
  verifyEmailAsync,
} from "../forgotPasswordSlice";

type OtpProps = {
  otpModalOpen: boolean;
  setOtpModalOpen: (value: boolean) => void;
  email: string;
};

const Otp: React.FC<OtpProps> = ({ otpModalOpen, setOtpModalOpen, email }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId, otpStatus, emailStatus } = useAppSelector(forgotPassword);
  const emailLoading = emailStatus === "loading";
  const otpLoading = otpStatus === "loading";
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  const onFinish = (values: any) => {
    dispatch(verifyOtpAsync({ email, otp: values?.otp }));
  };

  const handleCancel = () => {
    setOtpModalOpen(false);
  };

  const resendOtp = () => {
    dispatch(verifyEmailAsync(email)).then((e: any) => {
      if (e?.payload?.code === 200 && e?.payload?.status === "success") {
        setMinutes(2);
        setSeconds(0);
      }
    });
  };

  useEffect(() => {
    if (userId?.length > 0)
      navigate(`/${ROUTES.SET_PASSWORD}/${userId}`, { replace: true });
  }, [userId]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, minutes]);

  return (
    <Modal
      title={
        <Typography.Title level={5} style={{ margin: 0, textAlign: "center" }}>
          OTP
        </Typography.Title>
      }
      visible={otpModalOpen}
      footer={null}
      onCancel={handleCancel}
      // closable={false}
    >
      <Row justify="center" align="middle" style={{ flexDirection: "column" }}>
        <Typography.Paragraph style={{ margin: 0 }}>
          Code has been sent to <span style={{ color: "blue" }}>{email}</span>
        </Typography.Paragraph>
        <Typography.Link underline onClick={handleCancel}>
          This is not my email?
        </Typography.Link>
        <Form
          name="otpInput"
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          style={{ margin: "20px" }}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please input your otp!" }]}
            style={{ marginBottom: "5px" }}
          >
            <Input placeholder="Enter your otp here" />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6, span: 12 }}
            style={{ marginBottom: "0px" }}
          >
            <Button type="primary" htmlType="submit" loading={otpLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text>
          Haven't received the verification code?
        </Typography.Text>
        <Typography.Link
          underline
          disabled={minutes > 0 || seconds > 0}
          onClick={resendOtp}
        >
          Resend
        </Typography.Link>
        {emailLoading ? (
          <Spin size="small" />
        ) : minutes === 0 && seconds === 0 ? null : (
          <Typography.Text italic disabled>
            ({minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds})
          </Typography.Text>
        )}
      </Row>
    </Modal>
  );
};

export default Otp;
