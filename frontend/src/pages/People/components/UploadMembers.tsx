import React from "react";
import { Button, notification, Tooltip, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { STORAGE_KEY_CONSTANT } from "../../../utils/constants";
import { useAppDispatch } from "../../../redux/hooks";
import { getPeople } from "../peopleSlice";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../../../config/${env}.config`);

type UploadMembersProps = {
  userType: any;
  page: number;
  paginationSize: number;
};

const UploadMembers: React.FC<UploadMembersProps> = ({
  userType,
  page,
  paginationSize,
}) => {
  const dispatch = useAppDispatch();

  const props = {
    name: "file",
    action: `${config.REACT_APP_API_HOST}/user/import-users`,
    headers: {
      "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target?.result);
        };
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        if (info.file.response.status === "error") {
          notification.error({
            message: `${info.file.name} file couldn't upload! Accounts already exists...`,
          });
        } else {
          notification.success({
            message: `${info.file.name} file uploaded successfully!`,
          });
          const queryData = {
            page,
            paginationSize,
            status: userType === "active",
          };
          dispatch(getPeople(queryData));
        }
      } else if (info.file.status === "error") {
        notification.error({
          message: `${info.file.name} file upload failed!`,
        });
      }
    },
  };

  return (
    <div>
      <Upload {...props} accept=".xlsx, .csv" showUploadList={false}>
        <Tooltip title="File extension should be .xlsx or .csv">
          <Button type="default" icon={<UploadOutlined />}>
            Upload Members
          </Button>
        </Tooltip>
      </Upload>
    </div>
  );
};

export default UploadMembers;
