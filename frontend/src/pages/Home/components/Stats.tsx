import React from "react";
import { startCase } from "lodash";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { getStatusColorPro } from "../../../utils/constants";

type StatsProps = {
  loading: boolean;
  data: any;
};

const Stats: React.FC<StatsProps> = ({ data, loading }) => {
  const statisticProps = {
    valueStyle: { color: "#e56b6f" },
  };

  return (
    <Row justify="space-around" wrap gutter={[4, 16]}>
      <Col sm={10} xs={12} lg={5}>
        <Card loading={loading}>
          <Statistic
            title="Total Objectives"
            value={data.totalObjective}
            {...statisticProps}
          />
        </Card>
      </Col>
      <Col sm={10} xs={12} lg={5}>
        <Card loading={loading}>
          <Statistic
            title="Total Key results"
            value={data.totalKrs}
            {...statisticProps}
          />
        </Card>
      </Col>
      <Col sm={10} xs={12} lg={5}>
        <Card loading={loading}>
          <Statistic
            title="Overall Progress"
            value={data?.overallProgress || 0}
            precision={1}
            suffix="%"
            {...statisticProps}
          />
        </Card>
      </Col>
      <Col sm={10} xs={12} lg={5}>
        <Card loading={loading}>
          <Statistic
            title="Overall Status"
            valueRender={() => (
              // @ts-ignore
              <Typography.Text
                style={{ color: getStatusColorPro(data?.overallStatus) }}
              >
                {startCase(data?.overallStatus || "None")}
              </Typography.Text>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
