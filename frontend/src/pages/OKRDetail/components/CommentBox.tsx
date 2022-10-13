import React, { useEffect, useState } from "react";
import moment from "moment";
import { List, Avatar, Typography, Comment, Button } from "antd";

import { FormBuilder } from "../../../components";
import {
  getOkrByIdsync,
  commentOnOkrAsync,
  updateCommentOnOkrAsync,
  selectOkr,
} from "../../OKR/okrSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentUser, getAvatarUrl } from "../../../utils/constants";

type CommentBoxProps = {
  detailsData: any;
};

const CommentBox: React.FC<CommentBoxProps> = ({ detailsData }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectOkr);
  const [editComment, setEditComment] = useState(false);
  const loading = status === "loading";
  const id = detailsData?.okrObjectiveId;

  const [initialValues, setInitialValues] = useState({ text: "" });

  const onComment = (values: any) => {
    dispatch(
      commentOnOkrAsync({
        id,
        ...values,
      })
    ).then(() => {
      dispatch(getOkrByIdsync(id));
      setInitialValues({ text: "" });
    });
  };

  const onEditComment = (values: any) => {
    dispatch(
      updateCommentOnOkrAsync({
        id,
        commentid: editComment,
        commentedBy: currentUser.userid,
        ...values,
      })
    ).then(() => {
      dispatch(getOkrByIdsync(id));
      setInitialValues({ text: "" });
    });
    setEditComment(false);
  };

  useEffect(() => {}, [detailsData.okrComments]);

  return (
    <>
      <FormBuilder
        name="Comment Box"
        btnProps={{ size: "small" }}
        onFinish={onComment}
        width={"60%"}
        btnLoading={loading}
        initialValues={initialValues}
        submitButtonTitle={`Comment`}
        formItems={[
          {
            initialValue: "",
            type: {
              name: "textarea",
              props: {
                // @ts-ignore
                rows: 1,
                placeholder: "Write comment",
              },
            },
            name: "text",
          },
        ]}
      />
      <List
        dataSource={detailsData.okrComments}
        rowKey={(row: any) => row?._id}
        size="small"
        renderItem={(comment) => (
          <Comment
            author={`${comment.commentedBy.firstName} ${comment.commentedBy.surname}`}
            avatar={
              <Avatar
                src={getAvatarUrl(
                  `${comment.commentedBy.firstName}${comment.commentedBy.surname}`
                )}
              />
            }
            datetime={
              <Typography.Text>
                {`${moment(moment.now()).diff(
                  moment(comment.createdAt),
                  "days"
                )} days ago`}
              </Typography.Text>
            }
            content={
              comment?._id === editComment ? (
                <FormBuilder
                  name="Comment Edit Box"
                  btnProps={{ size: "small" }}
                  onFinish={onEditComment}
                  width={"60%"}
                  btnLoading={loading}
                  submitButtonTitle={`Edit Comment`}
                  formItems={[
                    {
                      initialValue: comment?.text,
                      type: {
                        name: "textarea",
                        props: {
                          // @ts-ignore
                          rows: 1,
                          placeholder: "Write comment",
                        },
                      },
                      name: "text",
                    },
                  ]}
                />
              ) : (
                <Typography.Paragraph>{comment.text}</Typography.Paragraph>
              )
            }
            actions={[
              <Button
                type="link"
                size="small"
                hidden={editComment}
                onClick={() => setEditComment(comment?._id)}
              >
                Edit
              </Button>,
            ]}
          />
        )}
      />
    </>
  );
};

export default CommentBox;
