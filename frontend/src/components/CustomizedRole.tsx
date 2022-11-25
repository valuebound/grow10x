import React from "react";
import { Typography } from "antd";
import { startCase, toLower } from "lodash";

type CustomizedRoleProps = {
  role: any;
};

const { Text } = Typography;

const CustomizedRole: React.FC<CustomizedRoleProps> = ({ role }) => {
  switch (role) {
    case "ADMIN":
      return (
        <Text style={{ color: "#52c41a" }}>{startCase(toLower(role))}</Text>
      );
    case "USER":
      return (
        <Text style={{ color: "#8c8c8c" }}>{startCase(toLower(role))}</Text>
      );
    /* to be implemented later on */
    case "MANAGER":
      return (
        <Text style={{ color: "#faad14" }}>{startCase(toLower(role))}</Text>
      );
    case "HR":
      return (
        <Text style={{ color: "#030852" }}>{startCase(toLower(role))}</Text>
      );
    default:
      return (
        <Text style={{ color: "#8c8c8c" }}>{startCase(toLower(role))}</Text>
      );
  }
};

export default CustomizedRole;
