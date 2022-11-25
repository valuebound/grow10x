import React, { useState } from "react";
import {
  Button,
  Image,
  notification,
  Popconfirm,
  Space,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import {
  currentUser,
  ROLES,
  STORAGE_KEY_CONSTANT,
} from "../../../utils/constants";
import fallBackLogo from "../../../assets/fallback_image.png";
import { getCompanyAbout, deleteCompanyLogo } from "../okrSlice";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../../../config/${env}.config`);

type LogoProps = {
  logoUrl: any;
  logo: any;
};

const Logo: React.FC<LogoProps> = ({ logoUrl, logo }) => {
  const dispatch = useAppDispatch();
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const props: UploadProps = {
    name: "image",
    method: "PUT",
    action: `${config.REACT_APP_API_HOST}/myorganization/logo/`,
    headers: {
      "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "",
    },
    onChange(info: any) {
      setShowProgress(true);
      if (info.file.status === "done") {
        info.fileList.length = 0;
        if (info.file.response.status === "error") {
          notification.error({
            message: `${info.file.name} couldn't upload! Logo already exists...`,
          });
          setShowProgress(false);
        } else {
          notification.success({
            message: `${info.file.name} uploaded successfully!`,
          });
          setShowProgress(false);
          dispatch(getCompanyAbout());
        }
      } else if (info.file.status === "error") {
        info.fileList.length = 0;
        notification.error({
          message: `${info.file.name} upload failed!`,
        });
        setShowProgress(false);
      }
    },
  };

  const onDelete = async (logo: any) => {
    await dispatch(deleteCompanyLogo(logo));
    await dispatch(getCompanyAbout());
  };

  return (
    <Space direction="vertical" align="center">
      <Image
        src={logoUrl}
        width={350}
        height={250}
        preview={false}
        fallback={fallBackLogo}
      />
      {currentUser?.role === ROLES.ADMIN &&
        (logoUrl && logo ? (
          <Space>
            <Upload
              {...props}
              accept=".jpeg, .png"
              showUploadList={showProgress}
            >
              <Tooltip title="File extension must be .jpeg or .png">
                <Button type="default" icon={<EditOutlined />}>
                  Edit
                </Button>
              </Tooltip>
            </Upload>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(logo)}
            >
              <Button type="default" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Upload {...props} accept=".jpeg, .png" showUploadList={showProgress}>
            <Tooltip title="File extension must be .jpeg or .png">
              <Button type="default" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Tooltip>
          </Upload>
        ))}
    </Space>
  );
};

export default Logo;
