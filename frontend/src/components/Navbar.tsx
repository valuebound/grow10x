import React from "react";
import { Space, Menu, Layout, Dropdown, Avatar, Typography } from "antd";
import { EyeFilled, LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { logOutAsync } from "../pages/Login/loginSlice";
import { useAppDispatch } from "../redux/hooks";
import { ROLES, RoleLabel } from "../utils/constants";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  user: any;
};

const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate(`/profile`);
  };

  let profileMenuItems: any = [];

  if (user?.role === ROLES.SUPER_ADMIN) {
    profileMenuItems = [
      ...profileMenuItems,
      {
        title: "Logout",
        icon: <LogoutOutlined />,
        onClick: () => dispatch(logOutAsync()),
      },
    ];
  } else {
    profileMenuItems = [
      ...profileMenuItems,
      {
        title: "Profile",
        icon: <EyeFilled />,
        onClick: () => onClickProfile(),
      },
      {
        title: "Logout",
        icon: <LogoutOutlined />,
        onClick: () => dispatch(logOutAsync()),
      },
    ];
  }

  const ProfileMenu = (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{ minWidth: 100 }}
      overlay={
        <Menu>
          {profileMenuItems.map((item: any) => (
            <Menu.Item
              key={item?.title}
              icon={item?.icon}
              onClick={item?.onClick}
            >
              {item?.title}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Avatar size="large" src={user?.avatar} />
    </Dropdown>
  );

  return (
    <StyledHeader>
      <LeftMenu></LeftMenu>
      <RightMenu>
        <Space>
          <ProfileName>
            <Typography.Text strong style={{ height: 20 }}>
              {user?.firstName}
            </Typography.Text>
            <Typography.Text type="secondary" style={{ height: 15, whiteSpace: "nowrap"}}>
              {/* @ts-ignore */}
              {RoleLabel[user?.role]}
            </Typography.Text>
          </ProfileName>
          {ProfileMenu}
        </Space>
      </RightMenu>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled(Header)`
  padding: 0;
  display: flex;
  z-index: 1000;
`;

const LeftMenu = styled(Menu)`
  display: flex;
  align-items: center;
  width: 50%;
`;

const RightMenu = styled(Menu)`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  backgroun-color: red;
  height: 80px;
`;
