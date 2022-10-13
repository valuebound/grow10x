import React, { useState } from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { activateMembers, getPeople } from "../peopleSlice";

type activateMemberProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  userType: string;
  page: number;
  paginationSize: number;
};

const ActivateMember: React.FC<activateMemberProps> = ({
  open,
  onClose,
  id,
  userType,
  page,
  paginationSize,
}) => {
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async () => {
    const queryData = {
      page,
      paginationSize,
      status: userType === "active",
    };
    setConfirmLoading(true);
    await dispatch(activateMembers(id));
    await dispatch(getPeople(queryData));
    setConfirmLoading(false);
    onClose();
  };

  return (
    <Modal
      title={"Activate Member"}
      width={600}
      visible={open}
      onCancel={onClose}
      okType="danger"
      okText="Yes, Activate"
      cancelText="No, Wait"
      onOk={onFinish}
      confirmLoading={confirmLoading}
    >
      <Typography.Text>
        Do you want to activate this member? <br />
      </Typography.Text>
    </Modal>
  );
};

export default ActivateMember;
