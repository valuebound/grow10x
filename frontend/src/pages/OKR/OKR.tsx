import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";

import { OKRList, CompanyInfo } from "./components";
import { OKR_TYPE } from "../../utils/constants";

type OKRProps = {};

const OKR: React.FC<OKRProps> = () => {
  return (
    <Container>
      <Tabs size="large" defaultActiveKey="okr">
        <Tabs.TabPane tab="OKR" key="okr">
          <OKRList okrType={OKR_TYPE.Individual} showHeader={true} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Company" key="company">
          <CompanyInfo />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

export default OKR;

const Container = styled.div`
  padding: 30px;
  width: 100%;
  @media screen and (max-width:  576px) {
   padding: 10px;
  }
`;
