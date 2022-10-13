import React, { useMemo, useState } from "react";
import { Line } from "@ant-design/plots";
import moment from "moment";
import { useAppSelector } from "../../../redux/hooks";
import { selectDashboard } from "../dashboardSlice";
import { Datum } from "@ant-design/charts";

type StepChartProps = {
  timePeriods: any;
};

const StepChart: React.FC<StepChartProps> = ({ timePeriods }) => {
  const { lineChartData } = useAppSelector(selectDashboard);
  const [data, setData] = useState(lineChartData);
  const [chartLoadin, setChartLoading] = useState(false);

  const getChartData = () => {
    setChartLoading(true);
    const currentTime = timePeriods.filter((time: any) => time.isCurrent)[0];
    const start_date = moment(currentTime?.startDate).format("YYYY-MM-DD");
    const end_date = moment(currentTime?.endDate).format("YYYY-MM-DD");
    const total_duration = moment(end_date).diff(moment(start_date), "days");
    const current_date = moment().format("YYYY-MM-DD");
    const current_duration = moment(current_date).diff(
      moment(start_date),
      "days"
    );

    let tempData = [];
    let actualValue = 0;

    for (let i = 0; i <= total_duration; i++) {
      let tempExpected = { date: "", value: 0, key: "expected" };
      let tempActual = { date: "", value: 0, key: "actual" };

      tempExpected.date = moment(start_date, "YYYY-MM-DD")
        .add(i, "days")
        .format("YYYY-MM-DD");
      tempExpected.value = Math.round((i / total_duration) * 100) || 0;
      tempData.push(tempExpected);

      if (i <= current_duration) {
        let flag = false;
        for (let j = 0; j <= lineChartData?.length; j++) {
          if (lineChartData[j]?.date === tempExpected.date) {
            tempActual.date = lineChartData[j]?.date;
            actualValue = lineChartData[j]?.value;
            tempActual.value = actualValue;
            flag = true;
            break;
          }
        }
        if (flag) tempData.push(tempActual);
        else {
          tempActual.date = tempExpected.date;
          tempActual.value = actualValue;
          tempData.push(tempActual);
        }
      }
    }

    setData(tempData);
    setChartLoading(false);
  };

  const config = {
    data,
    xField: "date",
    yField: "value",
    xAxis: {
      label: {
        formatter: (v: any) => ``,
      },
      tickCount: 0,
    },
    yAxis: {
      label: {
        formatter: (v: any) => ``,
      },
    },
    seriesField: "key",
    stepType: "hv",
    lineStyle: (d: any) => {
      if (d.key === "expected") {
        return {
          fill: "red",
          fillOpacity: 0,
          stroke: "grey",
          lineWidth: 1,
          lineDash: [5, 5],
          strokeOpacity: 0.5,
        };
      }
    },
    tooltip: {
      formatter: (datum: Datum) => {
        return { name: datum.key, value: datum.value + "%" };
      },
    },
  };

  useMemo(() => {
    getChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineChartData]);

  // @ts-ignore
  return <Line {...config} height={280} loading={chartLoadin} />;
};

export default StepChart;
