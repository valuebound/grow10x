import React from "react";
import { Form, Input, InputNumber } from "antd";

type EditableCellProps = {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
};

const { Item } = Form;

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              min: 3,
              message: `${title} must be at least 3 characters`,
            },
          ]}
        >
          {inputNode}
        </Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
