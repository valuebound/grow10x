import React, { useState } from "react";
import { Avatar, Space, Typography } from "antd";
import {
  CopyOutlined,
  MailOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import LocationIcon from "../assets/location_icon.png";

type PopoverContentProps = {
  avatar: any;
  firstName: any;
  surname: any;
  email: any;
  designation: any;
  phone: any;
  location: any;
};

const { Text, Link } = Typography;

const PopoverContent: React.FC<PopoverContentProps> = ({
  avatar,
  firstName,
  surname,
  email,
  designation,
  phone,
  location,
}) => {
  const [copyableEmail, setCopyableEmail] = useState<boolean>(false);
  const [copyablePhone, setCopyablePhone] = useState<boolean>(false);

  /* Showing & Hiding Copyable icon */
  const onMouseOverEmail = () => setCopyableEmail(true);
  const onMouseOutEmail = () => setCopyableEmail(false);

  const onMouseOverPhone = () => setCopyablePhone(true);
  const onMouseOutPhone = () => setCopyablePhone(false);

  return (
    <Space>
      <Avatar
        alt={`${firstName}${surname}`}
        size={75}
        src={avatar}
        onError={() => false}
      />
      <Space size={1} direction="vertical">
        <Text strong>{`${firstName} ${surname}`}</Text>
        {designation && (
          <Text type="secondary" strong>
            <ProfileOutlined /> {designation}
          </Text>
        )}
        {email && (
          <Link
            type="secondary"
            onMouseOver={onMouseOverEmail}
            onMouseOut={onMouseOutEmail}
            copyable={{
              icon: copyableEmail ? (
                <CopyOutlined
                  onClick={() => navigator.clipboard.writeText(email)}
                />
              ) : (
                <></>
              ),
            }}
          >
            <MailOutlined /> {email}
          </Link>
        )}
        {phone && (
          <Link
            type="secondary"
            onMouseOver={onMouseOverPhone}
            onMouseOut={onMouseOutPhone}
            copyable={{
              icon: copyablePhone ? (
                <CopyOutlined
                  onClick={() => navigator.clipboard.writeText(phone)}
                />
              ) : (
                <></>
              ),
            }}
          >
            <PhoneOutlined /> {phone}
          </Link>
        )}
        {location && (
          <Text type="secondary">
            <img src={LocationIcon} width={14} height={14} color="red" />
            {location}
          </Text>
        )}
      </Space>
    </Space>
  );
};

export default PopoverContent;
