import React from "react"
import { Modal, Typography } from "antd";

import { deleteOkrAsync } from "../okrSlice";
import { useAppDispatch } from "../../../redux/hooks";

type DeleteOKRProps = {
  open: boolean,
  onClose: () => void,
  id: string,
  onFinish: any,
}

const DeleteOKR: React.FC<DeleteOKRProps> = ({ id, open, onClose, onFinish }) => {

  const dispatch = useAppDispatch()

  const onDelete = () => {
    dispatch(deleteOkrAsync(id))
    onClose()
    onFinish()
  }

  return (
    <Modal
      title={"Delete OKR"}
      width={600}
      visible={open}
      onCancel={onClose}
      onOk={onDelete}
      okType="danger"
      okText="Yes, Delete"
      cancelText="No, Cancel"
    >
      <Typography.Text>
        Do you want to delete this OKR ?
      </Typography.Text>
    </Modal>
  )
};

export default DeleteOKR;
