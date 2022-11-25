import React, { useState } from "react";
import { Button, notification, Tooltip, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getCompanyId, STORAGE_KEY_CONSTANT } from "../../../utils/constants";
import { useAppDispatch } from "../../../redux/hooks";
import { getPeople } from "../peopleSlice";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../../../config/${env}.config`);

type UploadMembersProps = {
  userType: any;
  page: any;
  paginationSize: any;
};

const UploadMembers: React.FC<UploadMembersProps> = ({
  userType,
  page,
  paginationSize,
}) => {
  const dispatch = useAppDispatch();
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const props: UploadProps = {
    name: "file",
    action: `${config.REACT_APP_API_HOST}/user/import-users?orgid=${getCompanyId()?.id}`,
    headers: {
      "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "",
    },
    onChange(info: any) {
      setShowProgress(true);
      if (info.file.status !== "uploading") {
        let reader = new FileReader();
        reader.onload = (e) => {};
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        info.fileList.length = 0;
        if (info.file.response.status === "error") {
          notification.error({
            message: `${info.file.name} file couldn't upload! Accounts already exists...`,
          });
          setShowProgress(false);
        } else {
          notification.success({
            message: `${info.file.name} file uploaded successfully!`,
          });
          setShowProgress(false);
          const queryData = {
            page,
            paginationSize,
            status: userType === "active",
          };
          dispatch(getPeople(queryData));
        }
      } else if (info.file.status === "error") {
        info.fileList.length = 0;
        notification.error({
          message: `${info.file.name} file upload failed!`,
        });
        setShowProgress(false);
      }
    },
    progress: {
      strokeWidth: 5,
      showInfo: true,
    },
  };

  return (
    <>
      <Upload {...props} accept=".xlsx, .csv" showUploadList={showProgress}>
        <Tooltip title="File extension should be .xlsx or .csv">
          <Button type="default" icon={<UploadOutlined />}>
            Upload Members
          </Button>
        </Tooltip>
      </Upload>
    </>
  );
};

export default UploadMembers;
