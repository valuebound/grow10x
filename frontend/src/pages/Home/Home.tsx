import React, { useEffect, useState } from "react";
import { Col, Row, PageHeader, Segmented, Space } from "antd";
import styled from "styled-components";

import { Stats, Charts } from "./components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDashboard,
  getDashboardStats,
  getLineChartData,
} from "./dashboardSlice";
import {
  selectTime,
  getAllTimePeriodsAsync,
} from "../TimePeriod/timeperiodSlice";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectDashboard);
  const { data: timePeriods } = useAppSelector(selectTime);
  const loading = status === "loading";
  const [statisticTypes, setStatisticTypes] = useState<string | number>(
    "myStats"
  );

  const segmentOpt = [
    {
      label: "My Stats",
      value: "myStats",
    },
    {
      label: "Company Stats",
      value: "companyStats",
    },
  ];

  useEffect(() => {
    dispatch(getAllTimePeriodsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (timePeriods && timePeriods.length > 0) {
      dispatch(
        getDashboardStats({
          quarter: timePeriods.filter((time: any) => time.isCurrent)[0]?._id,
          company: statisticTypes === "companyStats",
        })
      );
      dispatch(
        getLineChartData({
          quarter: timePeriods.filter((time: any) => time.isCurrent)[0]?._id,
          company: statisticTypes === "companyStats",
        })
      );
    }
  }, [timePeriods, dispatch, statisticTypes]);

  return (
    <Container gutter={[0, 24]} data-test="home-container">
      <PageHeader
        title="Dashboard"
        extra={[
          <Space align="end" style={{ width: "100%" }}>
            <Segmented
              options={segmentOpt}
              value={statisticTypes}
              onChange={setStatisticTypes}
            />
          </Space>,
        ]}
        style={{ width: "100%" }}
      />
      <Col span={24}>
        <Stats data={data} loading={loading} />
      </Col>
      <Col span={24}>
        <Charts data={data} loading={loading} timePeriods={timePeriods} />
      </Col>
    </Container>
  );
};

export default Home;

const Container = styled(Row)`
  padding: 30px;
  width: 100%;

  @media screen and (max-width: 576px) {
    padding: 10px;
  }
`;
