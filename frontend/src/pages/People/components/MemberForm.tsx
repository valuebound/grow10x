import React, { useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import {
  MailOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { addMembers, getPeople } from "../peopleSlice";
import { useAppDispatch } from "../../../redux/hooks";

type MemberFormProps = {
  open: boolean;
  onClose: () => void;
  userType: any;
  page: number;
  paginationSize: number;
};

const MemberForm: React.FC<MemberFormProps> = ({
  open,
  onClose,
  userType,
  page,
  paginationSize,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    try {
      let res;
      res = await dispatch(addMembers(values.members));
      if (res.payload.status === "success") {
        const queryData = {
          page,
          paginationSize,
          status: userType === "active",
        };
        await dispatch(getPeople(queryData));
        onClose();
      }
      setConfirmLoading(false);
    } catch (error) {}
  };

  return (
    <Modal
      title="Add a Member"
      width={800}
      style={{ top: 20 }}
      visible={open}
      onOk={form.submit}
      okText="Submit"
      okButtonProps={{ loading: confirmLoading }}
      onCancel={onClose}
    >
      <Form
        form={form}
        name="dynamic_form_nest_item"
        initialValues={{
          members: [
            {
              email: "",
              firstName: "",
              surname: "",
            },
          ],
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="members">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space
                  // key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    label="Email"
                    name={[field.name, "email"]}
                    rules={[
                      { required: true, message: "Missing! Working Email" },
                    ]}
                  >
                    <Input
                      placeholder="Working Email"
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="First Name"
                    name={[field.name, "firstName"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing! Member first name",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" prefix={<UserOutlined />} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Surname"
                    name={[field.name, "surname"]}
                    rules={[
                      { required: true, message: "Missing! Member surname" },
                    ]}
                  >
                    <Input placeholder="Surname" prefix={<UserOutlined />} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                  {/* {fields.length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  ) : null} */}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add another member
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default MemberForm;
