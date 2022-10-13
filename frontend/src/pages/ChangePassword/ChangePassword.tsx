import React from "react";
import styled from "styled-components";
import { notification } from "antd";
import { LockOutlined } from "@ant-design/icons";

import FormBuilder from "../../components/FormBuilder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectChangePassword, signupAsync } from "./changePasswordSlice";

type ChangePasswordProps = {};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectChangePassword);
  const loading = status === "loading";

  if (error) {
    notification.error({ message: error });
  }

  const onSubmit = (values: any) => dispatch(signupAsync({}));

  return (
    <Container>
      <LeftHalf></LeftHalf>
      <RightHalf>
        <FormBuilder
          name="Update Password"
          width={400}
          btnLoading={loading}
          onFinish={onSubmit}
          submitButtonTitle="Update Password"
          formItems={[
            {
              initialValue: null,
              label: "Old Password",
              name: "oldPassword",
              rules: [{ required: true }],
              type: {
                name: "input",
                props: { type: "password", prefix: <LockOutlined /> },
              },
            },
            {
              initialValue: null,
              label: "New Password",
              name: "newPassword",
              rules: [{ required: true }],
              type: {
                name: "input",
                props: { type: "password", prefix: <LockOutlined /> },
              },
            },
          ]}
        />
      </RightHalf>
    </Container>
  );
};

export default ChangePassword;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftHalf = styled.div`
  width: 60%;
  height: 100vh;
  background-color: #293241;
`;
const RightHalf = styled.div`
  width: 40%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
