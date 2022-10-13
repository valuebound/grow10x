import React from "react";
import {
  Modal,
  Button,
  Form,
  Typography,
  Input,
  Divider,
  Row,
  Col,
} from "antd";
import {
  BankOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import {
  createOrganizationAsync,
  getOrganizationListAsync,
} from "../organizationSlice";
import { validateMessages } from "../../../utils/constants";

const { Item } = Form;
const { Paragraph } = Typography;

type CreateOrgModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
};

const CreateOrgModal: React.FC<CreateOrgModalProps> = ({
  visible,
  setVisible,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        orgUsername: values.orgName.toLowerCase(),
        adminName: `${values.firstName} ${values.lastName}`,
      };
      delete payload.firstName;
      delete payload.lastName;
      await dispatch(createOrganizationAsync(payload)).then((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (!(e.hasOwnProperty("error") && typeof e.payload === "string")) {
          form.resetFields();
          setVisible(false);
        }
      });
      await dispatch(getOrganizationListAsync());
    } catch (error) {
      console.log("error signingup org", error);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Create Organization"
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <StyledForm
          wrapperCol={{ span: 24 }}
          layout="vertical"
          validateMessages={validateMessages}
          onFinish={onSubmit}
        >
          <Row justify="space-evenly" wrap gutter={[16, 16]}>
            <StyledCol xs={{ span: 20 }} md={{ span: 10 }}>
              <StyledParagraph>Organization Details</StyledParagraph>
              <StyledDivider />
              <Item
                required
                key="orgName"
                label="Name"
                initialValue={null}
                name="orgName"
                rules={[
                  { required: true, message: "Missing organization name" },
                  {
                    min: 3,
                    max: 100,
                    message: "Org name must be between 3 and 100 characters",
                  },
                ]}
              >
                <Input prefix={<BankOutlined />} />
              </Item>
              <Item
                required
                key="adminEmail"
                label="Email"
                initialValue={null}
                name="adminEmail"
                rules={[{ required: true, message: "Missing email" }]}
              >
                <Input type="email" prefix={<MailOutlined />} />
              </Item>
              <Item
                required
                key="location"
                label="Location"
                initialValue={null}
                name="location"
                rules={[{ required: true, message: "Missing location" }]}
              >
                <Input type="text" prefix={<PushpinOutlined />} />
              </Item>
            </StyledCol>
            <StyledCol xs={{ span: 20 }} md={{ span: 10 }}>
              <StyledParagraph>Contact Person Details</StyledParagraph>
              <StyledDivider />
              <Item
                required
                key="firstName"
                label="First Name"
                initialValue={null}
                name="firstName"
                rules={[
                  { required: true, message: "Missing first name" },
                  {
                    min: 3,
                    max: 25,
                    message: "First name must be between 3 and 25 characters",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
              <Item
                required
                key="lastName"
                label="Last Name"
                initialValue={null}
                name="lastName"
                rules={[
                  { required: true, message: "Missing last name" },
                  {
                    min: 1,
                    max: 25,
                    message: "Last name must be between 1 and 25 characters",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
              <Item
                required
                key="adminPhone"
                label="Contact Number"
                initialValue={null}
                name="adminPhone"
                rules={[
                  { required: true, message: "Missing contact number" },
                  {
                    len: 10,
                    message: "Contact number must be 10 digits",
                  },
                  {
                    pattern: new RegExp(/[6-9]{1}[0-9]{9}/),
                    message: "Contact number must be a valid phone number",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Item>
            </StyledCol>
          </Row>
          <Item wrapperCol={{ xs: { offset: 10 }, md: { offset: 20 } }}>
            <Button type="primary" htmlType="submit" size="middle">
              Submit
            </Button>
          </Item>
        </StyledForm>
      </Modal>
    </>
  );
};

export default CreateOrgModal;

const StyledForm = styled(Form)`
  overflow-y: scroll;
  overflow-x: hidden;
`;
const StyledCol = styled(Col)`
  margin-bottom: 5px;
  border: 1px solid #ededed;
  border-radius: 10px;
`;
const StyledDivider = styled(Divider)`
  margin-top: 2px;
  margin-bottom: 2px;
`;
const StyledParagraph = styled(Paragraph)`
  text-align: center;
  .ant-typography {
    margin-bottom: 0px;
  }
`;
