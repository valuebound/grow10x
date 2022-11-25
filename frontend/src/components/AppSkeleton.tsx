import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Typography, Tooltip, Button, Grid } from "antd";
import {
  FieldTimeOutlined,
  ContactsOutlined,
  RocketOutlined,
  BankOutlined,
  HomeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Grow10Logo from "../assets/black-grow10xhb.jpg";
import fallBackLogo from "../assets/fallback_image.png";

import { Navbar, AnimatedPage } from ".";
import { ROUTES } from "../utils/routes.enum";

import { getCompanyId, ROLES, USER_KEY_CONSTANT } from "../utils/constants";

type AppSkeletonProps = {};

const { Sider, Content, Footer } = Layout;

const AppSkeleton: React.FC<AppSkeletonProps> = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(
    String(localStorage.getItem(USER_KEY_CONSTANT))
  );
  const companyData = getCompanyId();
  const companyId = companyData?.id?.length > 0;

  const [collapsed, setCollapsed] = useState(false);

  const logoUrl =
    userDetails?.role === ROLES.SUPER_ADMIN
      ? companyId
        ? companyData?.logoUrl
        : Grow10Logo
      : userDetails?.organization?.logoUrl
      ? userDetails?.organization?.logoUrl
      : fallBackLogo;

  let siderMenu: any[] = [];

  if (userDetails?.role === ROLES.USER) {
    siderMenu = [
      ...siderMenu,
      { title: "Dashboard", route: ROUTES.HOME, icon: <HomeOutlined /> },
      { title: "OKR", route: ROUTES.OKR, icon: <RocketOutlined /> },
      { title: "People", route: ROUTES.PEOPLE, icon: <ContactsOutlined /> },
    ];
  }

  if (
    userDetails?.role === ROLES.ADMIN ||
    (userDetails?.role === ROLES.SUPER_ADMIN && companyId)
  ) {
    siderMenu = [
      ...siderMenu,
      { title: "Dashboard", route: ROUTES.HOME, icon: <HomeOutlined /> },
      { title: "OKR", route: ROUTES.OKR, icon: <RocketOutlined /> },
      { title: "People", route: ROUTES.PEOPLE, icon: <ContactsOutlined /> },
      {
        title: "Configuration",
        route: ROUTES.TIMEPERIOD,
        icon: <FieldTimeOutlined />,
      },
    ];
  }

  if (userDetails?.role === ROLES.SUPER_ADMIN && !companyId) {
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
  const { useBreakpoint } = Grid;
  const screen = useBreakpoint();

  return (
    <StyledLayout hasSider>
      <Sider
        trigger={screen?.xs && null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={screen?.xs ? 0 : 80}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
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
          {!collapsed && (
            <Tooltip
              title={
                companyId
                  ? companyData?.orgName
                  : userDetails?.organization?.orgName
              }
            >
              <Typography.Title
                ellipsis
                style={{ color: "white", marginLeft: 10, marginBottom: 0 }}
                level={5}
              >
                {userDetails?.role !== ROLES.SUPER_ADMIN
                  ? userDetails?.organization?.orgName
                  : companyId
                  ? companyData?.orgName
                  : "Grow10x"}
              </Typography.Title>
            </Tooltip>
          )}
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
          minHeight: "calc(100vh - 64px)",
          marginLeft: collapsed ? (screen?.xs ? 0 : 80) : "200px",
        }}
      >
        <Navbar
          user={userDetails}
          collapsed={collapsed}
          screen={screen}
          setCollapsed={setCollapsed}
        />
        <StyledContent>
          <AnimatedPage>
            <Outlet />
          </AnimatedPage>
        </StyledContent>
        <Footer>
          {/* <Row justify="center" style={{ textAlign: "center" }}>
            Copyrights @ 2022. Valuebound. All rights reserved
          </Row> */}
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
  justify-content: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  // margin-right: 15px;
  /* background-color: #ee6c4d; */
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
