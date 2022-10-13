import { Modal, Space } from "antd";
import React from "react";

import { useAppDispatch } from "../../../redux/hooks";
import {
  deleteOrganizationAsync,
  getOrganizationListAsync,
} from "../organizationSlice";

type Props = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  record: any;
};

const DeleteOrgModal: React.FC<Props> = ({ visible, setVisible, record }) => {
  const dispatch = useAppDispatch();

  const hideModal = () => {
    setVisible(false);
  };
  const onDeleteOrganization = async () => {
    await dispatch(deleteOrganizationAsync(record?._id));
    await dispatch(getOrganizationListAsync());
    setVisible(false);
  };

  return (
    <Space>
      <Modal
        title="Deactivate"
        visible={visible}
        onOk={onDeleteOrganization}
        onCancel={hideModal}
        okText="Deactivate"
        cancelText="Cancel"
      >
        <h2>
          Are You sure do you want to deactivate{" "}
          <span style={{ color: "red" }}>{record.orgName}</span>?
        </h2>
        <p> It will deactivate all the users of this organization.</p>
      </Modal>
    </Space>
  );
};

export default DeleteOrgModal;
