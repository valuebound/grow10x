import React from "react";
import { startCase } from "lodash";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Row, Typography, Space, Col, Avatar } from "antd";

import { CustomProgress } from "../../../components";
import { useAppSelector } from "../../../redux/hooks";
import { selectTime } from "../../TimePeriod/timeperiodSlice";
import {
  getAvatarUrl,
  getStatusColor,
  OKR_STATUS_NOT_FOUND,
} from "../../../utils/constants";
import styled from "styled-components";

type DetailsCardProps = {
  row: any;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ row }) => {
  const { data: timePeriods } = useAppSelector(selectTime);

  const handleDueDays = (quarter: string) => {
    const endDate = timePeriods.filter((t: any) => t._id === quarter)[0]
      ?.endDate;
    return moment(endDate).diff(moment(moment.now()), "d");
  };

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Typography.Title level={5}>{row?.okrObjective}</Typography.Title>
        <Due onClick={(e) => e.stopPropagation()}>
          <Space style={{ width: 300 }}>
            <ClockCircleOutlined type="primary" />
            {`Due by ${handleDueDays(row.quarter)} days`}
          </Space>
          <CustomProgress
            size="default"
            percent={row?.okrProgress || 0}
            expected={row?.okrStatus}
            width={400}
          />
        </Due>
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <Card.Meta
            title={`Created by ${row?.okrOwner?.firstName} ${
              row?.okrOwner?.surname || ""
            }`}
            avatar={
              <Avatar
                size="small"
                src={getAvatarUrl(
                  `${row?.okrOwner?.firstName}${row?.okrOwner?.surname}`
                )}
              />
            }
            description={`${new Date(row?.okrCreatedAt).toLocaleString("en", {
              dateStyle: "medium",
              timeStyle: "short",
            })}`}
          />
        </Col>
        {row?.okrStatus?.length ? (
          <Space>
            <Typography.Title type="secondary" level={4}>
              Status:
            </Typography.Title>
            {/* @ts-ignore */}
            <Typography.Title level={4} type={getStatusColor(row?.okrStatus)}>
              {startCase(row?.okrStatus || OKR_STATUS_NOT_FOUND)}
            </Typography.Title>
          </Space>
        ) : null}
      </Row>
    </Card>
  );
};

export default DetailsCard;

const Due = styled.div`
  width: 500px;
  height: 20px;
  display: flex;
`;
