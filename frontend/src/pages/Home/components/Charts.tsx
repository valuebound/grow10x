import React, { useState } from "react";
import { Card, Col, Row, Segmented } from "antd";
import { Pie, measureTextWidth } from "@ant-design/plots";

import StepChart from "./StepChart";
import { getDonutChartColor } from "../../../utils/constants";

type ChartsProps = {
  data: any;
  loading?: boolean;
  timePeriods?: any;
};

const Charts: React.FC<ChartsProps> = ({
  data: chartData,
  loading = false,
  timePeriods,
}) => {
  const objectiveChartData = [
    {
      objective: "At Risk",
      value: chartData.objectiveAtRisk,
    },
    {
      objective: "Behind",
      value: chartData.objectiveBehind,
    },
    {
      objective: "Done",
      value: chartData.objectiveDone,
    },
    {
      objective: "On Track",
      value: chartData.objectiveOnTrack,
    },
  ];

  const keyChartData = [
    {
      objective: "At Risk",
      value: chartData.krAtRisk,
    },
    {
      objective: "Behind",
      value: chartData.krBehind,
    },
    {
      objective: "Done",
      value: chartData.krDone,
    },
    {
      objective: "On Track",
      value: chartData.krOnTrack,
    },
  ];

  const [donutChartType, setDonutChartType] = useState<string | number>(
    "Objective"
  );

  function renderStatistic(containerWidth: number, text: string, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  }

  const configPie = {
    appendPadding: 10,
    data: donutChartType === "Objective" ? objectiveChartData : keyChartData,
    angleField: "value",
    colorField: "objective",
    radius: 1,
    innerRadius: 0.65,
    meta: {
      value: {
        formatter: (v: number) => `${v} `,
      },
    },
    color: (d: any) => {
      return getDonutChartColor(d?.objective);
    },
    legend: {
      style: {
        fontSize: "22px",
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "",
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
        },
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.objective : "Total";
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "18px",
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? ` ${datum.value}`
            : ` ${data.reduce((r: number, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };

  return (
    <div>
      <Row justify="space-around" gutter={[0, 16]}>
        <Col xs={24} md={22} lg={13}>
          <Card loading={loading} style={{ width: "100%" }}>
            <StepChart timePeriods={timePeriods} />
          </Card>
        </Col>
        <Col xs={24} md={22} lg={9}>
          <Card loading={loading} style={{ width: "100%" }}>
            <Row justify="end">
              <Segmented
                options={["Objective", "Key Result"]}
                value={donutChartType}
                onChange={setDonutChartType}
              />
            </Row>
            {/* @ts-ignore */}
            <Pie {...configPie} height={250} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Charts;
