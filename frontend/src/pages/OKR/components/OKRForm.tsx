import React, { useEffect, useState } from "react";
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
  FormListFieldData,
  FormInstance,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import {
  currentUser,
  getCompanyId,
  krUnitOptions,
  OKR_TYPE,
  ROLES,
} from "../../../utils/constants";
import {
  createOkrAsync,
  searchUser,
  searchUserOkr,
  selectOkr,
  updateOkrAsync,
} from "../okrSlice";
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

type KRFieldProps = {
  field: FormListFieldData;
  i: number;
  remove: (index: number | number[]) => void;
  editMode: boolean;
  form: FormInstance<any>;
};

const KRField: React.FC<KRFieldProps> = ({
  field,
  i,
  remove,
  editMode,
  form,
}) => {
  const unit = Form.useWatch(["krs", field.name, "unit"], form);
  const currentRow = form.getFieldValue(["krs", field.name]);
  const start = Form.useWatch(["krs", field.name, "start"], form);
  const isBoolean = editMode
    ? currentRow?.unit === krUnitOptions[2].value
    : unit === krUnitOptions[2].value;
  const isPercent = unit === krUnitOptions[0].value;

  return (
    <Row key={field.key} gutter={[8, 8]} align="middle">
      <Col span={24}>
        <Item
          {...field}
          name={[field.name, "keyResult"]}
          label={`Key Result ${i + 1}`}
          rules={[{ required: true }]}
        >
          <Input placeholder="Key Result" />
        </Item>
      </Col>
      <Col sm={5} xs={8}>
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
          <Col sm={5} xs={6}>
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
          <Col sm={5} xs={8}>
            <Item
              {...field}
              label="Target"
              name={[field.name, "target"]}
              rules={[
                { required: true },
                {
                  type: "number",
                  min: 0,
                  message: "Target should not be lesser than 0",
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
  const companyData = getCompanyId();
  const companyId = companyData?.id?.length > 0;

  const { status } = useAppSelector(selectOkr);
  const loading = status === "loading";
  const [parentSelector, setParentSelector] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [Objs, setObjs]: any = useState([]);
  const [getTimePeriod, setTimeperiod]: any = useState(currentQuarter);
  const [parentId, setParentId]: any = useState();
  const [currUserId, setCurrUserId]: any = useState("");
  const [parentType, setparentType]: any = useState("individual");
  const [disabledSave, setDisabledSave] = useState(true);
  const [bestPrac, setBestPrac] = useState({
    notNumberObj: true,
    lessThan80Obj: true,
    key1result: false,
    numberKey: true,
    notMore5key: false,
  });

  const cloneMode = !editMode && Object.keys(row).length > 0;

  const getTitle = () =>
    editMode
      ? "Update OKR"
      : cloneMode
      ? "Clone OKR"
      : isCompany
      ? "Create Company wide OKR"
      : "Create OKR";

  const onSubmit = async (values: any) => {
    if (editMode) {
      let payload = {
        ...values,
        // type: isCompany ? OKR_TYPE.CompanyWide : OKR_TYPE.Individual,
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
        values.type !== row?.okrType ||
        JSON.stringify(row?.krs) !== JSON.stringify(values.krs)
      ) {
        await dispatch(updateOkrAsync({ ...payload, id: row?.okrObjectiveId }));
        onFinish();
      }
    } else {
      let payload = {
        ...values,
        type: values?.type ? values.type : OKR_TYPE.Individual,
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

  const checkBestPrac = (formData: any) => {
    if (!formData?.objective || /\d/.test(formData?.objective)) {
      setBestPrac((oldData) => ({ ...oldData, ["notNumberObj"]: true }));
    } else {
      setBestPrac((oldData) => ({ ...oldData, ["notNumberObj"]: false }));
    }

    if (
      !formData?.objective ||
      formData?.objective?.length <= 0 ||
      formData?.objective?.length > 80
    ) {
      setBestPrac((oldData) => ({ ...oldData, ["lessThan80Obj"]: true }));
    } else {
      setBestPrac((oldData) => ({ ...oldData, ["lessThan80Obj"]: false }));
    }

    let flag = true;
    formData?.krs.forEach((element: any) => {
      if (/[0-9]/.test(element?.keyResult)) flag = false;
    });
    setBestPrac((oldData) => ({ ...oldData, ["numberKey"]: flag }));

    if (formData?.krs?.length < 1) {
      setBestPrac((oldData) => ({ ...oldData, ["key1result"]: true }));
    } else {
      setBestPrac((oldData) => ({ ...oldData, ["key1result"]: false }));
    }

    if (formData?.krs?.length > 5) {
      setBestPrac((oldData) => ({ ...oldData, ["notMore5key"]: true }));
    } else {
      setBestPrac((oldData) => ({ ...oldData, ["notMore5key"]: false }));
    }
  };

  const ParentOkr = (e: any) => {
    setParentId(e);
  };

  const handleFormChange = (e: any) => {
    const formData = form.getFieldsValue();
    checkBestPrac(formData);
    if (
      formData.quarter !== row?.quarter ||
      formData.objective !== row?.okrObjective ||
      formData.type !== row?.okrType ||
      JSON.stringify(row?.krs) !== JSON.stringify(formData.krs)
    ) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  };

  const openParentOkrSelector = (e: any) => {
    if (parentSelector === false) {
      setParentSelector(true);
    } else {
      setParentSelector(false);
    }
  };

  const fetchUser = async (e: any) => {
    const data: any = await dispatch(searchUser({ name: e }));
    setOptions(data.payload.data);
  };

  const onSelectUser = async (e: any) => {
    const payload = {
      quarter: getTimePeriod,
      userId: e,
      type: parentType,
    };
    const data: any = await dispatch(searchUserOkr(payload));
    setObjs(data.payload.data);
    setCurrUserId(e);
  };

  const setOkrType = async (e: any) => {
    setparentType(e);
    const payload = {
      quarter: getTimePeriod,
      userId: currUserId,
      type: e,
    };
    const data: any = await dispatch(searchUserOkr(payload));
    setObjs(data.payload.data);
  };

  useEffect(() => {
    const formData = form.getFieldsValue();
    checkBestPrac(formData);
  }, []);

  return (
    <Modal
      title={<Typography.Title level={5}>{getTitle()}</Typography.Title>}
      width={"80%"}
      visible={open}
      onCancel={onClose}
      okText={getTitle()}
      onOk={form.submit}
      okButtonProps={{ loading, disabled: !cloneMode && disabledSave }}
      cancelButtonProps={{ disabled: !cloneMode && disabledSave }}
    >
      <StyledForm
        form={form}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onValuesChange={(e) => handleFormChange(e)}
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
        <Row>
          <Col span={17}>
            <StyledForm
              form={form}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              onValuesChange={(e) => handleFormChange(e)}
              initialValues={
                editMode || cloneMode
                  ? {
                      ...row,
                      objective: row.okrObjective,
                      type: isCompany
                        ? OKR_TYPE.CompanyWide
                        : OKR_TYPE.Individual,
                    }
                  : {
                      ...row,
                      type: isCompany
                        ? OKR_TYPE.CompanyWide
                        : OKR_TYPE.Individual,
                    }
              }
              onFinish={onSubmit}
            >
              <Row style={{ width: "100%" }} gutter={[16, 16]}>
                <>
                  <Col span={24}>
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
                  {(currentUser?.role === ROLES.ADMIN ||
                    (currentUser?.role === ROLES.SUPER_ADMIN && companyId)) && (
                    <Col span={10}>
                      <Item
                        label="OKR Type"
                        name="type"
                        initialValue={""}
                        rules={[{ required: true }]}
                      >
                        <Select placeholder="Select an OKR type">
                          <Select.Option value={"individual"}>
                            Individual
                          </Select.Option>
                          <Select.Option value={"company"}>
                            Orgnizational
                          </Select.Option>
                        </Select>
                      </Item>
                    </Col>
                  )}
                  <Col span={14}>
                    <Item
                      label="Quarter"
                      name="quarter"
                      initialValue={currentQuarter}
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
                  <Col span={24}>
                    <Typography.Link
                      onClick={(e: any) => {
                        openParentOkrSelector(e);
                      }}
                    >
                      Select Parent Okr (optional)
                    </Typography.Link>
                    {parentSelector && timePeriods && (
                      <Row gutter={16}>
                        <Col span={12}>
                          <Item
                            key={"SearchUser"}
                            label={"Search User"}
                            rules={[{ required: false, message: "Optional" }]}
                            initialValue={""}
                          >
                            <Select
                              showSearch
                              optionFilterProp="children"
                              onSearch={(e: any) => {
                                fetchUser(e);
                              }}
                              onSelect={(e: any) => {
                                onSelectUser(e);
                              }}
                              allowClear
                            >
                              {options.map((item: any) => (
                                <Option key={item?._id} value={item?._id}>
                                  {item?.firstName} {item?.surname}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col span={12}>
                          <Typography.Paragraph
                            style={{ paddingBottom: 8, margin: 0 }}
                          >
                            Parent Okr Type
                          </Typography.Paragraph>
                          <Select
                            placeholder="Select an OKR type"
                            onChange={setOkrType}
                            value={parentType}
                          >
                            <Select.Option value={"individual"}>
                              Individual
                            </Select.Option>
                            <Select.Option value={"company"}>
                              Orgnizational
                            </Select.Option>
                          </Select>
                        </Col>
                        <Col span={24}>
                          <Item
                            name="parent"
                            rules={[{ required: false, message: "Optional" }]}
                            initialValue={""}
                            key={"userObjective"}
                            label={"Search User Objective"}
                          >
                            <Select
                              showSearch
                              placeholder="Search User Objective"
                              optionFilterProp="children"
                              onSelect={(e: any) => {
                                ParentOkr(e);
                              }}
                              filterOption={(input, option) =>
                                (
                                  option!.children as unknown as string
                                ).includes(input)
                              }
                              allowClear
                            >
                              {Objs.map((item: any) => (
                                <Option key={item?._id} value={item?._id}>
                                  {item?.objective}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </>
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
                      <KRField
                        field={field}
                        i={i}
                        remove={remove}
                        editMode={editMode}
                        form={form}
                      />
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
          </Col>
          <Col span={1}>
            <Divider type="vertical" style={{ height: "300px" }} />
          </Col>
          <Col span={6}>
            <Typography.Title level={3}>Best Practices</Typography.Title>
            <Typography.Paragraph>Objective</Typography.Paragraph>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: bestPrac.notNumberObj ? "#faad14" : "green" }}
              />
              <Typography.Paragraph>
                Does not contain a number
              </Typography.Paragraph>
            </Space>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: bestPrac.lessThan80Obj ? "#faad14" : "green" }}
              />
              <Typography.Paragraph>
                Should be less than 80 characters
              </Typography.Paragraph>
            </Space>
            <Typography.Paragraph>Key Results</Typography.Paragraph>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: bestPrac.key1result ? "#faad14" : "green" }}
              />
              <Typography.Paragraph>At least 1 Key Result</Typography.Paragraph>
            </Space>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: bestPrac.numberKey ? "#faad14" : "green" }}
              />
              <Typography.Paragraph>Should be numeric</Typography.Paragraph>
            </Space>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: bestPrac.notMore5key ? "#faad14" : "green" }}
              />
              <Typography.Paragraph>
                Not more than 5 Key results
              </Typography.Paragraph>
            </Space>
          </Col>
        </Row>
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
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
