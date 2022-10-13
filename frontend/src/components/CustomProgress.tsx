import React from "react";
import { Progress } from "antd";

import { getProgressColor, getProgressColorPro } from "../utils/constants";

type CustomProgressProps = {
  size?: "small" | "default";
  percent: number;
  expected: string;
  showPercentSymbol?: boolean;
  width?: number | string;
};

const CustomProgress: React.FC<CustomProgressProps> = ({
  size = "small",
  percent = 0,
  expected = "",
  showPercentSymbol = true,
  width,
}) => {
  return (
    <Progress
      format={() => `${percent}${showPercentSymbol ? "%" : ""}`}
      percent={percent}
      width={size === "default" ? 40 : 25}
      strokeWidth={size === "default" ? 20 : 10}
      // status={getProgressColor(percent)}
      strokeColor={getProgressColorPro(expected)}
      style={{ width: width || 150 }}
    />
  );
};

export default CustomProgress;
