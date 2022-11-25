import React from "react";
import { Modal } from "antd";
import moment from "moment";

import FormBuilder from "../../../components/FormBuilder";
import { useAppDispatch } from "../../../redux/hooks";
import {
  createTimePeriodsAsync,
  updateTimePeriodsAsync,
  getAllTimePeriodsAsync,
} from "../timeperiodSlice";

type Props = {
  loading?: boolean;
  visible: boolean;
  editMode?: boolean;
  initialValues?: any;
  onClose: () => void;
};

const TimeCycleModal: React.FC<Props> = ({
  loading = false,
  visible,
  editMode,
  initialValues = {},
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        _id: initialValues._id,
        startDate: moment(new Date(values.daterange[0])).format("YYYY-MM-DD"),
        endDate: moment(new Date(values.daterange[1])).format("YYYY-MM-DD"),
      };
      delete payload.daterange;
      if (editMode) {
        await dispatch(updateTimePeriodsAsync(payload));
      } else {
        await dispatch(createTimePeriodsAsync(payload));
      }
      await dispatch(getAllTimePeriodsAsync());
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <Modal
        visible={visible}
        width={800}
        title="Time Period"
        onCancel={onClose}
        footer={null}
      >
        <FormBuilder
          width={"100%"}
          name="TimePeriod"
          btnBlock={false}
          btnOffest={21}
          submitButtonTitle={editMode ? "Update" : "Create"}
          btnLoading={loading}
          onFinish={onSubmit}
          initialValues={
            editMode
              ? {
                  ...initialValues,
                  daterange: [
                    moment(initialValues.startDate),
                    moment(initialValues.endDate),
                  ],
                }
              : {}
          }
          formItems={[
            {
              initialValue: null,
              label: "Name",
              name: "name",
              rules: [{ required: true }],
              type: {
                name: "input",
                props: {},
              },
            },
            {
              initialValue: null,
              label: "",
              name: "daterange",
              rules: [{ required: true }],
              type: {
                name: "range",
                props: {},
              },
            },
            // TODO: Checkbox value unable to prefill
            // {
            //   initialValue: false,
            //   label: "Mark this period current?",
            //   name: "isCurrent",
            //   type: {
            //     name: "checkbox",
            //     props: {},
            //   },
            // },
          ]}
        />
      </Modal>
    </>
  );
};

export default TimeCycleModal;
