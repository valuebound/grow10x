import React, { useState } from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteMembers, getPeople } from "../peopleSlice";

type deleteMemberProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  userType:string;
};

const DeleteMember: React.FC<deleteMemberProps> = ({
  open,
  onClose,
  id,
  userType
}) => {
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async () => {
    setConfirmLoading(true);
    await dispatch(deleteMembers(id));
    await dispatch(getPeople(userType==="active"));
    setConfirmLoading(false);
    onClose();
  };

  return (
    <Modal
      title={"Delete Member"}
      width={600}
      visible={open}
      onCancel={onClose}
      okType="danger"
      okText="Yes, Delete"
      cancelText="No, Wait"
      onOk={onFinish}
      confirmLoading={confirmLoading}
    >
      <Typography.Text>
        Do you want to delete this member? <br />
      </Typography.Text>
    </Modal>
  );
};

export default DeleteMember;
