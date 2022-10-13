import React from "react";
import { Modal } from "antd";

import { OKRList } from "../../OKR/components"
import { OKR_TYPE } from "../../../utils/constants";

type OKRProgressProps = {
  open: boolean;
  onClose: () => void;
  row: any;
};

const OKRProgress: React.FC<OKRProgressProps> = ({ open, onClose, row }) => {

  return (
    <Modal
      title={`${row.firstName}'s OKRs`}
      width={1100}
      visible={open}
      onCancel={onClose}
      footer={null}
    >
      <OKRList okrType={OKR_TYPE.Individual} showHeader={false} owner={row?._id} />
    </Modal>
  );
};

export default OKRProgress;
