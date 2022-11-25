import { Card, Col, PageHeader, Row, Segmented, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { OrgChartUsingDiv, OrgTree } from "./components";

type OrgChartProps = { activeTab: string };

const OrgChart: React.FC<OrgChartProps> = ({ activeTab }) => {
  const [chartTypes, setChartTypes] = useState<string | number>("Tree");
  return (
    <Container gutter={[0, 16]}>
      <Space direction="vertical" align="end" style={{ width: "100%" }}>
        <Segmented
          options={["Tree", "Chart"]}
          value={chartTypes}
          onChange={setChartTypes}
        />
      </Space>
      <Col span={24}></Col>
      {chartTypes === "Tree" && <OrgTree />}

      {chartTypes === "Chart" && <OrgChartUsingDiv activeTab={activeTab} />}
    </Container>
  );
};

export default OrgChart;

const Container = styled(Row)`
  width: 100%;
  overflow: auto;
`;
