import React, { useState } from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { deactivateMembers, getPeople } from "../peopleSlice";

type DeactivateMemberProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  userType: string;
  page: number;
  paginationSize: number;
};

const DeactivateMember: React.FC<DeactivateMemberProps> = ({
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
    await dispatch(deactivateMembers(id));
    await dispatch(getPeople(queryData));
    setConfirmLoading(false);
    onClose();
  };

  return (
    <Modal
      title={"Deactivate Member"}
      width={600}
      visible={open}
      onCancel={onClose}
      okType="danger"
      okText="Yes, Deactivate"
      cancelText="No, Wait"
      onOk={onFinish}
      confirmLoading={confirmLoading}
    >
      <Typography.Text>
        Do you want to deactivate this member? <br />
      </Typography.Text>
    </Modal>
  );
};

export default DeactivateMember;
