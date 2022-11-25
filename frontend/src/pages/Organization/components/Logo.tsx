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
import { STORAGE_KEY_CONSTANT } from "../../../utils/constants";
import fallBackLogo from "../../../assets/fallback_image.png";
import { useAppDispatch } from "../../../redux/hooks";
import {
  deleteOrganizationLogoAsync,
  getOrganizationListAsync,
} from "../organizationSlice";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../../../config/${env}.config`);

type LogoProps = {
  logo: any;
  logoUrl: any;
  orgId: string;
};

const Logo: React.FC<LogoProps> = ({ logo, orgId, logoUrl }) => {
  const dispatch = useAppDispatch();
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const props: UploadProps = {
    name: "image",
    method: "PUT",
    action: `${config.REACT_APP_API_HOST}/auth/update/logo/${orgId}`,
    headers: {
      "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "",
    },

    // beforeUpload: (file) => {
    //   const isJPEG = file.type === "image/jpeg";
    //   const isPNG = file.type === "image/png";
    //   if (!isPNG || !isJPEG)
    //     notification.error({
    //       message: `${file.name} is not a png or jpeg file`,
    //     });
    // },
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
          dispatch(getOrganizationListAsync());
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

  const onDelete = async (logo: any, orgId: any) => {
    const payload = { logo, orgId };
    await dispatch(deleteOrganizationLogoAsync(payload));
    await dispatch(getOrganizationListAsync());
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
      {logo && logoUrl ? (
        <Space>
          <Upload {...props} accept=".jpeg, .png" showUploadList={showProgress}>
            <Tooltip title="File extension must be .jpeg or .png">
              <Button type="default" icon={<EditOutlined />}>
                Edit
              </Button>
            </Tooltip>
          </Upload>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(logo, orgId)}
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
      )}
    </Space>
  );
};

export default Logo;
