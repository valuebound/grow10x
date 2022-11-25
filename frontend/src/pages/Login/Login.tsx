import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Typography, Space, Divider } from "antd";
import { MailOutlined, LockOutlined, HeartFilled } from "@ant-design/icons";
//import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FormBuilder from "../../components/FormBuilder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAuth, loginAsync } from "./loginSlice";
import AuthContext from "../../utils/AuthContext";
import { ROUTES } from "../../utils/routes.enum";
import { ROLES, USER_KEY_CONSTANT } from "../../utils/constants";
import LoginImg from "../../assets/login.svg";
import VBLogo from "../../assets/vb_logo.svg";
import Grow10Logo from "../../assets/grow10x-new-removebg.png";
import RedHeart from "../../assets/red-heart.png";
import { Link } from "react-router-dom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useContext(AuthContext);
  const { status } = useAppSelector(selectAuth);
  const loading = status === "loading";

  // useEffect(()=>{
  //   /* global google */
  //   google.accounts.id.initialize(
  //     client_id: "176331006924-1an7dmbvf16s65v7u9smqqslfkqse6mc.apps.googleusercontent.com",
  //     callback: responseGoogle
  //   )
  // }, [])

  useEffect(() => {
    if (authenticated) {
      window.location.replace(ROUTES.HOME);
    }
  }, [authenticated]);

  const onSubmit = async (values: any) => {
    await dispatch(loginAsync(values)).then(() => {
      const userDetails = JSON.parse(
        String(localStorage.getItem(USER_KEY_CONSTANT))
      );
      if (userDetails?.role === ROLES.SUPER_ADMIN) {
        window.location.replace(ROUTES.ORGANIZATION);
      } else {
        if (
          userDetails.hasOwnProperty("passwordChanged") &&
          !userDetails.passwordChanged
        ) {
          window.location.replace(
            `${ROUTES.SET_PASSWORD}/${userDetails?.userid}`
          );
        } else {
          window.location.replace(ROUTES.HOME);
        }
      }
    });
  };
  const onGoogleSubmit = (data: any) => {
    try {
      const payload = {
        email: "",
        password: " ",
        googleAuthToken: data.credential,
      };
      onSubmit(payload);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <LeftHalf>
        <Space direction="vertical">
          <img
            alt="person entering door"
            src={LoginImg}
            width={"90%"}
            style={{ maxWidth: 400 }}
            data-testid="left-half-space-img"
          />
          <Typography.Title style={{ color: "white" }}>
            Grow10x Login
          </Typography.Title>
          <Typography.Title level={3} style={{ color: "white" }}>
            Sky rocket your employee's performance
          </Typography.Title>
        </Space>
      </LeftHalf>
      <RightHalf>
        <StyledImg
          src={Grow10Logo}
          alt="Grow10x"
          data-testid="right-half-logo"
        />
        <FormContainer>
          <FormBuilder
            name="Login"
            width={"100%"}
            btnLoading={loading}
            btnBlock
            onFinish={onSubmit}
            submitButtonTitle="Login"
            formItems={[
              {
                initialValue: null,
                label: "Email",
                name: "email",
                rules: [{ required: true, type: "email" }],
                type: {
                  name: "input",
                  props: {
                    type: "email",
                    prefix: <MailOutlined />,
                  },
                },
              },
              {
                initialValue: null,
                label: "Password",
                name: "password",
                rules: [{ required: true }],
                type: {
                  name: "password",
                  props: {
                    type: "password",
                    prefix: <LockOutlined />,
                  },
                },
              },
            ]}
          />
          <Link to={`/${ROUTES.FORGOT_PASSWORD}`}>Forgotten password?</Link>
          <Divider>OR</Divider>
        </FormContainer>
        <GoogleLogin onSuccess={(e) => onGoogleSubmit(e)} onError={() => {}} />
        <StyledFooter data-testid="login-styled-footer">
          Made in India with
          <img src={RedHeart} alt="heart-logo" width={25} />
          <br />
          {`Brought to you by Valuebound `}
          <img src={VBLogo} alt="valuebound-logo" width={20} />
        </StyledFooter>
      </RightHalf>
    </Container>
  );
};

export default Login;

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
const StyledImg = styled.img`
  width: 100px;
  margin-bottom: 25px;
  border-radius: 15px;
`;
const StyledFooter = styled(Typography.Text)`
  position: absolute;
  align-items: center;
  text-align: center;
  bottom: 20px;
`;
