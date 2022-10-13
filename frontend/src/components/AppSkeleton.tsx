import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Row, Menu, Typography, Tooltip, Button } from "antd";
import {
  FieldTimeOutlined,
  ContactsOutlined,
  RocketOutlined,
  BankOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Grow10Logo from "../assets/black-grow10xhb.jpg";

import { Navbar, AnimatedPage } from ".";
import { ROUTES } from "../utils/routes.enum";

import { ROLES, USER_KEY_CONSTANT } from "../utils/constants";

type AppSkeletonProps = {};

const { Sider, Content, Footer } = Layout;

const AppSkeleton: React.FC<AppSkeletonProps> = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(
    String(localStorage.getItem(USER_KEY_CONSTANT))
  );
  const logoUrl =
    userDetails?.role === ROLES.SUPER_ADMIN
      ? Grow10Logo
      : "data:image/jpeg;base64,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";

  let siderMenu: any[] = [];

  if (userDetails?.role === ROLES.USER) {
    siderMenu = [
      ...siderMenu,
      { title: "Dashboard", route: ROUTES.HOME, icon: <HomeOutlined /> },
      { title: "OKR", route: ROUTES.OKR, icon: <RocketOutlined /> },
      { title: "People", route: ROUTES.PEOPLE, icon: <ContactsOutlined /> },
    ];
  }

  if (userDetails?.role === ROLES.ADMIN) {
    siderMenu = [
      ...siderMenu,
      { title: "Dashboard", route: ROUTES.HOME, icon: <HomeOutlined /> },
      { title: "OKR", route: ROUTES.OKR, icon: <RocketOutlined /> },
      { title: "People", route: ROUTES.PEOPLE, icon: <ContactsOutlined /> },
      {
        title: "Time Period",
        route: ROUTES.TIMEPERIOD,
        icon: <FieldTimeOutlined />,
      },
    ];
  }

  if (userDetails?.role === ROLES.SUPER_ADMIN) {
    siderMenu = [
      ...siderMenu,
      {
        title: "Organization",
        route: ROUTES.ORGANIZATION,
        icon: <BankOutlined />,
      },
    ];
  }

  const currentMenuItem = () => {
    if (location.pathname === "/") {
      return [siderMenu[0]?.title];
    }
    const path = location.pathname.substring(1, location.pathname.length);
    return [siderMenu.filter((menu) => menu.route === path)[0]?.title];
  };

  const handleNavigate = (route: string) => () => navigate(route);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledLayout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        style={{
          height: "100%",
          position: "fixed",
        }}
      >
        <LogoArea>
          <Logo
            src={logoUrl}
            onClick={handleNavigate(
              userDetails?.role === ROLES.SUPER_ADMIN
                ? ROUTES.ORGANIZATION
                : ROUTES.HOME
            )}
          />
          {!collapsed && 
          <Tooltip title={userDetails?.organization?.orgName}>
            <Typography.Title
              ellipsis
              style={{ color: "white", marginLeft: 10, marginBottom:0 }}
              level={5}
            >
              {userDetails?.role !== ROLES.SUPER_ADMIN
                ? userDetails?.organization?.orgName
                : "Grow10x"}
            </Typography.Title>
          </Tooltip>
          }
        </LogoArea>
        <Menu theme="dark" defaultSelectedKeys={currentMenuItem()}>
          {siderMenu.map((item) => (
            <Menu.Item
              key={item.title}
              icon={item.icon}
              onClick={handleNavigate(item.route)}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          position: "relative",
          minWidth: "250px",
          minHeight:"calc(100vh - 64px)",
          marginLeft: collapsed ? "80px" : "200px",
        }}
      >
        <Navbar user={userDetails} />
        <StyledContent>
          <AnimatedPage>
            <Outlet />
          </AnimatedPage>
        </StyledContent>
        <Footer>
          <Row justify="center">
            Copyrights @ 2022. Valuebound. All rights reserved
          </Row>
        </Footer>
      </Layout>
      <a
        href="https://forms.gle/UqQ1m1ytpTWEhScv6"
        target={"_blank"}
        rel="noreferrer"
      >
        <StyledFeedbackbtn
          type="primary"
          // style={{backgroundColor:"#002140"}}
          icon={<FormOutlined style={{ color: "white" }} />}
        >
          Feedback
        </StyledFeedbackbtn>
      </a>
    </StyledLayout>
  );
};

export default AppSkeleton;

const StyledLayout = styled(Layout)`
  margin: 0;
`;

const StyledContent = styled(Content)`
  margin: 0;
  min-height: calc(100% - 70px);
`;

const LogoArea = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content:center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  // margin-right: 15px;
  background-color: #ee6c4d;
  cursor: pointer;
`;

const StyledFeedbackbtn = styled(Button)`
  position: fixed;
  background-color: #002140;
  border-color: #002140;
  /* bottom: 20px;
  right: 15px;
  border-radius: 15px 15px 0px 15px; */
  /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4); */
  z-index: 999;

  bottom: 100px;
  right: -45px;
  transform: rotate(270deg);
`;
