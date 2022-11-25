import { Card, Col, PageHeader, Row } from "antd";
import React from "react";
import styled from "styled-components";
import ChangePassword from "./components/ChangePassword";

type SettingProps = {};

const Setting: React.FC<SettingProps> = () => {
  return (
    <Container gutter={[0, 16]}>
      <Col span={24}>
        {/* <Card> */}
          <PageHeader title="Settings" />
        {/* </Card> */}
      </Col>
      <Col span={24}>
        <Card>
          <ChangePassword />
        </Card>
      </Col>
    </Container>
  );
};

export default Setting;

const Container = styled(Row)`
  padding: 30px;

  @media screen and (max-width: 576px) {
    padding: 10px;
  }
`;
