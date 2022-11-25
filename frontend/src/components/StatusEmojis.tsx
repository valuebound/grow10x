import React from "react";

type StatusEmojisProps = {
  overallStatus: any;
};

const StatusEmojis: React.FC<StatusEmojisProps> = ({ overallStatus }) => {
  switch (overallStatus) {
    case "atRisk":
      return (
        <span style={{ color: "transparent", textShadow: "0 0 0 #ff4d4f" }}>
          👉
        </span>
      );
    case "behind":
      return (
        <span style={{ color: "transparent", textShadow: "0 0 0 #faad14" }}>
          👉
        </span>
      );
    case "onTrack":
      return (
        <span style={{ color: "transparent", textShadow: "0 0 0 #1890ff" }}>
          👉
        </span>
      );
    case "done":
      return (
        <span style={{ color: "transparent", textShadow: "0 0 0 #52c41a" }}>
          👉
        </span>
      );
    default:
      return (
        <span style={{ color: "transparent", textShadow: "0 0 0 #bfbfbf" }}>
          👉
        </span>
      );
  }
};

export default StatusEmojis;
