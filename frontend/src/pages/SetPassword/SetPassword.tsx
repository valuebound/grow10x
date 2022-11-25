import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Form, Space, Typography, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import FormBuilder from "../../components/FormBuilder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPassword, setPasswordAsync } from "./setPasswordSlice";
import setPasswordImg from "../../assets/setPasswordImg.svg";
import { ROUTES } from "../../utils/routes.enum";
import { ChangePasswordForm } from "./components";
import AuthContext from "../../utils/AuthContext";

type ChangePasswordProps = {};

const SetPassword: React.FC<ChangePasswordProps> = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);

  const { status, passwordChanged } = useAppSelector(setPassword);
  let { id } = useParams();

  const loading = status === "loading";

  useEffect(() => {
    if (passwordChanged) {
      authenticated
        ? navigate(`${ROUTES.HOME}`, { replace: true })
        : navigate(`/${ROUTES.LOGIN}`, { replace: true });
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
          <ChangePasswordForm form={form} onSubmit={onSubmit} />
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
