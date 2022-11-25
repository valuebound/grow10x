import {
  Row,
  Col,
  Button,
  Card,
  Radio,
  Checkbox,
  Select,
  TimePicker,
  Space,
  Typography,
  Form,
} from "antd";

import moment from "moment";
import styled from "styled-components";

import "../styles.css";

type NotificationsProps = {
  title: any;
  subtitle: any;
  initialValues: any;
  onSubmit: (values: any) => void;
  showCheckBox: boolean;
  loading?: boolean;
};

const { Option } = Select;

const Notifications: React.FC<NotificationsProps> = ({
  title,
  subtitle,
  initialValues,
  onSubmit,
  showCheckBox,
  loading = false,
}) => {
  const weekdays = [
    { label: "Sunday", value: "SUNDAY" },
    { label: "Monday", value: "MONDAY" },
    { label: "Tuesday", value: "TUESDAY" },
    { label: "Wednesday", value: "WEDNESDAY" },
    { label: "Thursday", value: "THURSDAY" },
    { label: "Friday", value: "FRIDAY" },
    { label: "Saturday", value: "SATURDAY" },
  ];

  const format = "HH:mm";

  return (
    <Container>
      <Form
        initialValues={{
          ...initialValues,
          time: moment(initialValues.time, format),
        }}
        onFinish={onSubmit}
      >
        <Row>
          <Col span={24}>
            <Typography.Title level={3}>{title}</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>{subtitle}</Typography.Title>
          </Col>
        </Row>
        <StyledRow justify="center">
          <StyledCol span={12} xs={24} xl={8}>
            <Typography.Text strong>ON</Typography.Text>
            <Space direction="vertical">
              <Card>
                <Form.Item name="day">
                  <Radio.Group>
                    <Row gutter={[16, 12]} justify="center">
                      {weekdays.map((weekday) => (
                        <Col key={weekday.label} span={6}>
                          <Radio.Button value={weekday.value}>
                            {weekday.label}
                          </Radio.Button>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Space>
          </StyledCol>

          <StyledCol span={6} xs={24} xl={8}>
            <Typography.Text strong>AT</Typography.Text>
            <br />
            <Space direction="vertical">
              <Form.Item name="time">
                <TimePicker format={format} />
              </Form.Item>
            </Space>
          </StyledCol>

          <StyledCol span={6} xs={24} xl={8}>
            <Typography.Text strong>TIMEZONE</Typography.Text>
            <Card>
              <Typography.Paragraph style={{ textAlign: "center" }}>
                {initialValues.timeZone}
              </Typography.Paragraph>
            </Card>
          </StyledCol>
        </StyledRow>
        <StyledRow align="middle"></StyledRow>
        <StyledRow>
          <Space direction="horizontal" align="baseline" size={50}>
            {showCheckBox && (
              <Space direction="horizontal" align="baseline">
                <Form.Item name="Check">
                  <Checkbox />
                  {"Do not include the OKRs updated within the last "}
                  <Form.Item name="Days">
                    <Select
                      size="small"
                      defaultValue="1"
                      style={{ width: "80px" }}
                    >
                      {new Array(31).fill(0).map((_, days) => (
                        <Option value={days}>{days}</Option>
                      ))}
                    </Select>
                    {" day"}
                  </Form.Item>
                </Form.Item>
              </Space>
            )}
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              loading={loading}
            >
              Save
            </Button>
          </Space>
        </StyledRow>
      </Form>
    </Container>
  );
};

export default Notifications;

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
