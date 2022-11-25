import React, { useState } from "react";
import styled from "styled-components";
import {
  Avatar,
  Modal,
  Comment,
  Typography,
  Timeline,
  Space,
  Empty,
  Spin,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { Activity, Kr, PrevDatum, OkrComment } from "../okr.types";
import {
  timeAgoFrom,
} from "../../../utils/constants";
import { selectOkr } from "../okrSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { startCase } from "lodash";

type CommentsModalProps = {
  open: boolean;
  viewMode: boolean;
  onClose: () => void;
  onFinish: () => void;
  kr: Kr;
};

const CommentsModal: React.FC<CommentsModalProps> = ({
  kr,
  open,
  viewMode,
  onClose,
  onFinish,
}) => {
  const dispatch = useAppDispatch();
  const { activityFeed, statusAF } = useAppSelector(selectOkr);
  const loading = statusAF === "loading";
  const [comments, setComments] = useState<OkrComment[]>([]);

  const actionLabel = {
    KR_UPDATED: "updated KR",
    KR_CREATED: "created KR",
    KR_PROGRESS_UPDATED: "checked in KR",
    COMMENTED: "commented",
    COMMENT_UPDATED: "updated comment",
    OKR_CREATED: "created OKR",
    OKR_UPDATED: "updated OKR",
    KR_PROGRESS_UPDATED_COMMENTED: "checked in with comment",
  };


  const formatKrProgressUpdated = (data: PrevDatum) => {
    return Object.entries(data || {})
      .filter((r) => typeof r[1] !== "object")
      ?.map(([k, v]) => `${startCase(k)}: ${String(v)}`)
      ?.join(", ");
  };

  const renderFeedUseCase = (action: string, row: Activity) => {
    switch (action) {
      case "KR_CREATED":
        return (
          <Typography.Text type="success">
            {row?.newData?.keyResult}
          </Typography.Text>
        );
      case "KR_PROGRESS_UPDATED_COMMENTED":
        return (
          <Space>
            <Typography.Text type="danger" delete>
              {formatKrProgressUpdated(row?.prevData)}
            </Typography.Text>
            <ArrowRightOutlined />
            <Typography.Text type="secondary">
              {row?.newData?.comment !== "" && "Comment: "}
              <Typography.Text type="success">
                {row?.newData?.comment}
                {row?.newData?.comment !== "" && ", "}
              </Typography.Text>
              {"Current Value: "}
              <Typography.Text type="success">
                {row?.newData?.currentValue}
              </Typography.Text>
            </Typography.Text>
          </Space>
        );
      case "COMMENTED":
        return (
          <Typography.Text type="success">
            {row?.newData?.comment}
          </Typography.Text>
        );
      case "KR_UPDATED":
        return (
          <Space>
            <Typography.Text type="danger" delete>
              {formatKrProgressUpdated(row?.prevData)}
            </Typography.Text>
            <ArrowRightOutlined />
            <Typography.Text type="success">
              {formatKrProgressUpdated(row?.newData)}
            </Typography.Text>
          </Space>
        );
      case "OKR_UPDATED":
        return (
          <Space>
            <Typography.Text type="danger" delete>
              {formatKrProgressUpdated(row?.prevData)}
            </Typography.Text>
            <ArrowRightOutlined />
            <Typography.Text type="success">
              {formatKrProgressUpdated(row?.newData)}
            </Typography.Text>
          </Space>
        );
      default:
        return null;
    }
  };


  return (
    <Modal
      visible={open}
      onCancel={onClose}
      title={<Typography.Text ellipsis>Activity Feed of {kr?.keyResult}</Typography.Text>}
      width={600}
      footer={null}
      bodyStyle={{ padding: "10px 20px" }}
    >
      {loading ? <Spin /> :(
      <StyledTimeline>
        {activityFeed?.activity?.length === 0 && (
          <EmptyFeed description="No activity. Check-in to make some changes" />
        )}
        {activityFeed?.activity
          ?.filter(
            (a: Activity) =>
              !["OKR_CREATED", "OKR_UPDATED"].includes(a?.operation)
          )
          .map((feed: Activity) => (
            <Timeline.Item>
              <Comment
                // @ts-ignore
                author={`${feed.createdBy?.firstName} ${
                  feed?.createdBy?.surname || ""
                  // @ts-ignore
                } ${actionLabel[feed?.operation]}`}
                avatar={<Avatar src={feed.createdBy?.avatar} />}
                datetime={
                  <Typography.Text>
                    {timeAgoFrom(feed?.timestamp?.toString())}
                  </Typography.Text>
                }
                content={renderFeedUseCase(feed?.operation, feed)}
              />
            </Timeline.Item>
          ))}
      </StyledTimeline>
      )}
    </Modal>
  );
};

export default React.memo(CommentsModal);

const StyledTimeline = styled(Timeline)`
  margin-top: 10px;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const EmptyFeed = styled(Empty)`
  margin: 30px;
`;
