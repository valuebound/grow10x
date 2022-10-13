import React, { useEffect, useState, useMemo } from "react";
import { startCase } from "lodash";
import styled from "styled-components";
import {
  Avatar,
  Card,
  Row,
  Space,
  Tabs,
  Timeline,
  Typography,
  List,
  Comment,
  Button,
  Empty,
  Col,
} from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { LeftCircleOutlined, EditOutlined } from "@ant-design/icons";

import { CustomProgress } from "../../components";
import { DetailsCard, CommentBox } from "./components";
import { OKRForm } from "../OKR/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectOkr, getOkrByIdsync } from "../OKR/okrSlice";
import { getStatusColor } from "../../utils/constants";
import { selectTime } from "../TimePeriod/timeperiodSlice";
import moment from "moment";

type OKRDetailProps = {};

const { TabPane } = Tabs;

const OKRDetail: React.FC<OKRDetailProps> = () => {
  const dispatch = useAppDispatch();
  const { detailsData } = useAppSelector(selectOkr);
  const { data: timePeriods } = useAppSelector(selectTime);
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const useQuery = () => useMemo(() => new URLSearchParams(search), []);
  const query = useQuery();

  const [editOkr, setEditOkr] = useState(false);

  const handleBackButton = () => navigate(-1);

  const getCurrentQuarter = timePeriods.filter((t: any) => t.isCurrent)[0];
  const start_date = moment(getCurrentQuarter?.startDate).format("YYYY-MM-DD");
  const end_date = moment(getCurrentQuarter?.endDate).format("YYYY-MM-DD");
  const current_date = moment().format("YYYY-MM-DD");
  const total_duration = moment(end_date).diff(moment(start_date), "days");
  const current_duration = moment(current_date).diff(
    moment(start_date),
    "days"
  );
  let expected_kr = (current_duration / total_duration) * 100;
  expected_kr = Math.round(expected_kr);

  const renderCurrent = (kr: any) => {
    switch (kr?.unit) {
      case "%":
        return (
          <Space>
            <Typography.Text>Start: {`${kr.start}`}</Typography.Text>
            <CustomProgress percent={kr?.krProgress} expected={kr?.krStatus} />
            <Typography.Text>Target: {`${kr.target}`}</Typography.Text>
          </Space>
        );
      case "boolean":
        return (
          <Typography.Text
            type={kr?.currentValue === 100 ? "success" : "danger"}
          >
            {kr?.currentValue === 100 ? "Completed" : "Not Done"}
          </Typography.Text>
        );
      case "number":
        return (
          <Space>
            <Typography.Text>Start: {`${kr.start}`}</Typography.Text>
            <CustomProgress
              showPercentSymbol={false}
              percent={kr?.krProgress}
              expected={kr?.krStatus}
            />
            <Typography.Text>Target: {`${kr.target}`}</Typography.Text>
          </Space>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (id !== "") {
      dispatch(getOkrByIdsync(id));
    }
  }, [dispatch, id]);

  return (
    <Container>
      <Row justify="space-between">
        <StyledButton
          type="link"
          onClick={handleBackButton}
          icon={<LeftCircleOutlined />}
        >
          Back to OKR
        </StyledButton>
        <StyledButton
          type="link"
          onClick={() => setEditOkr(true)}
          icon={<EditOutlined />}
        >
          Edit
        </StyledButton>
      </Row>
      {/* @ts-ignore  */}
      <DetailsCard
        row={{ ...detailsData, createdAt: query.get("createdAt") }}
      />

      <StyledTabs defaultActiveKey="1">
        <TabPane tab="Key Objectives" key="1">
          <Timeline style={{ marginLeft: 20, marginTop: 20 }}>
            {detailsData?.krs?.length === 0 && (
              <Empty description="No Key Objectives" />
            )}
            {detailsData?.krs?.map((kr: any) => (
              <Timeline.Item>
                <StyledCard hoverable size="small">
                  <Row justify="space-between" style={{ width: "100%" }}>
                    <Col span={8}>
                      <Typography.Text>{kr.keyResult}</Typography.Text>
                    </Col>
                    <Col span={10}>{renderCurrent(kr)}</Col>
                    <Col span={6}>
                      <Typography.Text>
                        Status: {/* @ts-ignore */}
                        <Typography.Text type={getStatusColor(kr?.status)}>
                          {startCase(kr?.status)}
                        </Typography.Text>
                      </Typography.Text>
                    </Col>
                  </Row>
                </StyledCard>
              </Timeline.Item>
            ))}
          </Timeline>
        </TabPane>
        <TabPane tab="Comments" key="2">
          <CommentBox detailsData={detailsData} />
        </TabPane>
        <TabPane tab="Feedback" key="3">
          <List
            dataSource={detailsData.comments}
            rowKey={(row: any) => row?._id}
            renderItem={(comment) => (
              <Comment
                author={comment.commentedBy}
                avatar={<Avatar />}
                datetime={
                  <Typography.Text>
                    {comment.createdAt?.toLocaleString()}
                  </Typography.Text>
                }
                content={
                  <Typography.Paragraph>{comment.text}</Typography.Paragraph>
                }
              />
            )}
          />
        </TabPane>
      </StyledTabs>
      {editOkr && (
        <OKRForm
          editMode
          row={detailsData}
          open={editOkr}
          onClose={() => setEditOkr(false)}
          onFinish={() => dispatch(getOkrByIdsync(id))}
        />
      )}
    </Container>
  );
};

export default OKRDetail;

const Container = styled.div`
  padding: 30px;
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  padding: 10px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  padding-right: 20px;
`;
