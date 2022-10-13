import React from "react";
import styled from "styled-components";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  Row,
  Col,
  Button,
  Card,
  Checkbox,
  Select,
  TimePicker,
  Space,
  Typography,
} from "antd";

type NewNotificationsProps = {};

const NewNotifications: React.FC<NewNotificationsProps> = () => {
  const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Container>
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>
            Individual Check-in reminder
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>
            (Sent to owners of the OKR)
          </Typography.Title>
        </Col>
      </Row>
      <StyledRow>
        <Col span={8}>ON</Col>
        <StyledCol span={8}>AT</StyledCol>
        <StyledCol span={8}>Timezone</StyledCol>
      </StyledRow>
      <StyledRow align="middle">
        <StyledCol span={8}>
          <Space direction="vertical">
            <Card>
              <Checkbox.Group
                onChange={(e: CheckboxValueType[]) => {}}
              >
                <Row>
                  {weekdays.map((weekday) => (
                    <Col span={6}>
                      <Checkbox value={weekday}>{weekday}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Card>
          </Space>
        </StyledCol>
        <StyledCol span={8}>
          <Space direction="vertical">
            <TimePicker
              allowClear
              size="large"
              showSecond={true}
              format="HH:MM"
            />
          </Space>
        </StyledCol>
        <StyledCol span={8}>
          <Space direction="vertical"></Space>
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <Space direction="horizontal" align="baseline" size={50}>
          <Space direction="horizontal" align="baseline">
            <Checkbox />
              <Typography.Paragraph>{"Do not include the OKRs updated within the last "}</Typography.Paragraph>
              <Select size="small" defaultValue="1">
                {new Array(31).map((_, i) => i+1).map((numOfDays) => (
                  <Select.Option value={numOfDays}>{numOfDays}</Select.Option>
                ))}
              </Select>
              <Typography.Paragraph>{" day"}</Typography.Paragraph>
          </Space>
          <Button type="primary" size="small">Save</Button>
        </Space>
      </StyledRow>
    </Container>
  );
};

export default NewNotifications;

const Container = styled.div`
  padding: 0 20px;
`;

const StyledRow = styled(Row)`
  margin: 15px 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
