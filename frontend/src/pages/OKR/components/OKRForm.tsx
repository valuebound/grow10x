import React, { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Button,
  Form,
  Typography,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Space,
  Tag,
  message,
} from "antd";
import {
  CalendarOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

import { krUnitOptions, OKR_TYPE } from "../../../utils/constants";
import { createOkrAsync, selectOkr, updateOkrAsync } from "../okrSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type OKRFormProps = {
  editMode: boolean;
  isCompany?: boolean;
  row: any;
  open: boolean;
  onClose: () => void;
  onFinish: any;
  timePeriods?: any[];
  currentQuarter?: any;
};

const { Item, List } = Form;
const { Option } = Select;

const OKRForm: React.FC<OKRFormProps> = ({
  editMode,
  isCompany = false,
  row,
  open,
  onClose,
  onFinish,
  timePeriods,
  currentQuarter,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { status } = useAppSelector(selectOkr);
  const loading = status === "loading";

  const [disabledSave, setDisabledSave] = useState(true);

  const cloneMode = !editMode && Object.keys(row).length > 0;

  const getTitle = () =>
    editMode
      ? "Update OKR"
      : cloneMode
      ? "Clone OKR"
      : isCompany
      ? "Create Company wide OKR"
      : "Create Individual OKR";

  const onSubmit = async (values: any) => {
    if (editMode) {
      let payload = {
        ...values,
        type: isCompany ? OKR_TYPE.CompanyWide : OKR_TYPE.Individual,
        krs: values.krs.map((kr: any) => ({
          keyResult: kr.keyResult,
          target: kr.unit === krUnitOptions[2].value ? 100 : kr.target,
          start: kr.unit === krUnitOptions[2].value ? 0 : kr.start,
          currentValue:
            kr.unit === krUnitOptions[2].value
              ? kr.currentValue
                ? 100
                : 0
              : kr.currentValue
              ? kr.currentValue
              : kr.start,
          isBoolean: kr.isBoolean,
          comment: kr?.krComments,
          unit: kr.unit,
          _id: kr?.krsId,
        })),
      };
      if (
        values.quarter !== row?.quarter ||
        values.objective !== row?.okrObjective ||
        JSON.stringify(row?.krs) !== JSON.stringify(values.krs)
      ) {
        await dispatch(updateOkrAsync({ ...payload, id: row?.okrObjectiveId }));
        onFinish();
      }
    } else {
      let payload = {
        ...values,
        type: isCompany ? OKR_TYPE.CompanyWide : OKR_TYPE.Individual,
        krs: values.krs.map((kr: any) => ({
          ...kr,
          currentValue:
            kr.unit === krUnitOptions[2].value
              ? kr.currentValue
                ? 100
                : 0
              : kr.currentValue,
          isBoolean: kr.unit === krUnitOptions[2].value,
          target: kr.unit === krUnitOptions[2].value ? 100 : kr.target,
          start: kr.unit === krUnitOptions[2].value ? 0 : kr.start,
        })),
      };
      await dispatch(createOkrAsync(payload));
      onFinish();
    }
    onClose();
  };

  const KRField = ({ field, i, remove }: any) => {
    const unit = Form.useWatch(["krs", field.name, "unit"], form);
    const currentRow = form.getFieldValue(["krs", field.name]);
    const start = Form.useWatch(["krs", field.name, "start"], form);
    const isBoolean = editMode
      ? currentRow?.unit === krUnitOptions[2].value
      : unit === krUnitOptions[2].value;
    const isPercent = unit === krUnitOptions[0].value;

    return (
      <Row key={field.key} gutter={[8, 8]} align="middle">
        <Col span={isBoolean ? 20 : 15}>
          <Item
            {...field}
            name={[field.name, "keyResult"]}
            label={`Key Result ${i + 1}`}
            rules={[{ required: true }]}
          >
            <Input placeholder="Key Result" />
          </Item>
        </Col>
        <Col span={3}>
          <Item
            {...field}
            label="Unit"
            initialValue={krUnitOptions[1].value}
            name={[field.name, "unit"]}
          >
            <Select>
              {krUnitOptions.map(({ label, value }) => (
                <Option value={value}>{label}</Option>
              ))}
            </Select>
          </Item>
        </Col>
        {!isBoolean && (
          <>
            <Col span={2}>
              <Item
                {...field}
                label="Start"
                name={[field.name, "start"]}
                rules={[
                  { required: true },
                  {
                    type: "number",
                    min: 0,
                    message: "Start should not be lesser than 0",
                  },
                  {
                    type: "number",
                    max: isPercent ? 100 : undefined,
                    message: "Start should not be greater than 100",
                  },
                ]}
              >
                <InputNumber
                  controls={{
                    upIcon: <PlusOutlined />,
                    downIcon: <MinusOutlined />,
                  }}
                  style={{ width: "100%" }}
                />
              </Item>
            </Col>
            <Col span={3}>
              <Item
                {...field}
                label="Target"
                name={[field.name, "target"]}
                rules={[
                  { required: true },
                  {
                    type: "number",
                    min: start,
                    message: "Target should not be lesser than start",
                  },
                  {
                    type: "number",
                    max: isPercent ? 100 : undefined,
                    message: "Target should not be greater than 100",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={isPercent && "%"}
                  controls={{
                    upIcon: <PlusOutlined />,
                    downIcon: <MinusOutlined />,
                  }}
                  style={{ width: "100%" }}
                />
              </Item>
            </Col>
          </>
        )}
        <StyledMinusIcon onClick={() => remove(field.name)} />
      </Row>
    );
  };
  
  const handleFormChange = (e:any) => {
    const formData = form.getFieldsValue()
    if(formData.quarter !== row?.quarter ||
    formData.objective !== row?.okrObjective ||
    JSON.stringify(row?.krs) !== JSON.stringify(formData.krs)){
      setDisabledSave(false)
    }else{
      setDisabledSave(true)
    } 
  }

  return (
    <Modal
      title={<Typography.Title level={5}>{getTitle()}</Typography.Title>}
      width={"80%"}
      visible={open}
      onCancel={onClose}
      okText={getTitle()}
      onOk={form.submit}
      okButtonProps={{ loading, disabled:disabledSave }}
      cancelButtonProps={{disabled:disabledSave}}
    >
      <StyledForm
        form={form}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onValuesChange={(e)=>handleFormChange(e)}
        initialValues={
          editMode || cloneMode
            ? {
                ...row,
                objective: row.okrObjective,
                type: isCompany ? OKR_TYPE.CompanyWide : OKR_TYPE.Individual,
              }
            : {
                ...row,
                type: isCompany ? OKR_TYPE.CompanyWide : OKR_TYPE.Individual,
              }
        }
        onFinish={onSubmit}
      >
        <Row style={{ width: "100%" }} gutter={[16, 16]}>
          <Col span={16}>
            <Item
              key="objective"
              label="Objective"
              initialValue={null}
              name="objective"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: Refresh OKR process to increase company alignment." />
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Quarter"
              name="quarter"
              initialValue={currentQuarter?._id}
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a time period"
                suffixIcon={<CalendarOutlined />}
              >
                {timePeriods
                  ?.filter((t) => !t.isLocked)
                  ?.map((q: any) => (
                    <Select.Option value={q?._id}>
                      <Space direction="horizontal">
                        {q?.name}
                        {q?.isCurrent && <Tag>current</Tag>}
                        {q?.isLocked && <LockOutlined />}
                      </Space>
                    </Select.Option>
                  ))}
              </Select>
            </Item>
          </Col>
        </Row>

        <List
          name="krs"
          initialValue={[
            {
              keyResult: "",
              unit: krUnitOptions[0].value,
              start: null,
              target: null,
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <KRField field={field} i={i} remove={remove} />
              ))}
              <Item>
                <Button type="link" onClick={() => add()}>
                  + Add Key Result
                </Button>
              </Item>
            </>
          )}
        </List>
      </StyledForm>
    </Modal>
  );
};

export default OKRForm;

const StyledMinusIcon = styled(MinusCircleOutlined)`
  margin-left: 10px;
`;

const StyledForm = styled(Form)`
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
