import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Menu, Layout, Dropdown, Avatar, Typography } from "antd";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import {
  EyeFilled,
  ImportOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import { logOutAsync } from "../pages/Login/loginSlice";
import { useAppDispatch } from "../redux/hooks";
import { ROLES, RoleLabel, COMPANY_ID, getCompanyId } from "../utils/constants";
import { ROUTES } from "../utils/routes.enum";

type NavbarProps = {
  user: any;
  collapsed: boolean;
  screen: Partial<Record<Breakpoint, boolean>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = ({
  user,
  collapsed,
  screen,
  setCollapsed,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const companyId = getCompanyId()?.id || "";

  const onClickProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const onClickSetting = () => {
    navigate(ROUTES.SETTING);
  };

  const onClickExitOrg = () => {
    localStorage.removeItem(COMPANY_ID);
    window.location.replace(ROUTES.ORGANIZATION);
  };

  let profileMenuItems: any = [
    {
      title: "Setting",
      icon: <SettingOutlined />,
      onClick: () => onClickSetting(),
    },
    {
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logOutAsync()),
    },
  ];

  if (user?.role === ROLES.SUPER_ADMIN) {
    if (companyId.length > 0) {
      profileMenuItems = [
        {
          title: "Exit Org",
          icon: <ImportOutlined />,
          onClick: () => onClickExitOrg(),
        },
        ...profileMenuItems,
      ];
    }
  } else {
    profileMenuItems = [
      {
        title: "Profile",
        icon: <EyeFilled />,
        onClick: () => onClickProfile(),
      },
      ...profileMenuItems,
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
    <StyledHeader screen={screen} style={{}}>
      <LeftMenu>
        {screen?.xs &&
          React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
              style: { marginLeft: "20px", fontSize: "20px" },
            }
          )}
      </LeftMenu>
      <RightMenu>
        <Space>
          <ProfileName>
            <Typography.Text strong style={{ height: 20 }}>
              {user?.firstName}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{ height: 15, whiteSpace: "nowrap" }}
            >
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

const StyledHeader = styled(Header)<{
  screen: Partial<Record<Breakpoint, boolean>>;
}>`
  position: ${(props) => (props.screen?.xs ? "sticky" : "initial")};
  top: 0;
  width: 100%;
  padding: 0;
  display: flex;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.screen?.xs ? "0 -6px 10px 5px rgba(0,0,0,0.5)" : "none"};
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
  height: 80px;
`;
