import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { startCase } from "lodash";
import {
  Popover,
  Typography,
  Slider,
  Switch,
  InputNumber,
  Button,
  Col,
  Space,
  Row,
  Tooltip,
} from "antd";

import { FormBuilder } from "../../../components";
import { useAppDispatch } from "../../../redux/hooks";
import { checkInkrAsync } from "../okrSlice";
import { Kr } from "../okr.types";
import {
  currentUser,
  getStatusByProgress,
  getStatusColor,
  getStatusColorPro,
} from "../../../utils/constants";
import { CloseOutlined } from "@ant-design/icons";

type CheckinPopupProps = {
  progress: number;
  kr: Kr;
  onFinish: any;
  isBoolean: boolean;
  viewMode?: boolean;
  okrOwnerId: string;
  timePeriods: any[];
  quarter: string;
  onCollapse: any;
};

const CheckinPopup: React.FC<CheckinPopupProps> = ({
  progress,
  kr,
  onFinish,
  isBoolean,
  viewMode = false,
  okrOwnerId,
  timePeriods,
  quarter,
  onCollapse,
}) => {
  const dispatch = useAppDispatch();
  const userCanEdit = currentUser?.userid === okrOwnerId;

  const [showPopup, openPopup] = useState<boolean>(false);
  const [switchVal, setSwitchVal] = useState<number>(progress);
  const [sliderVal, setSliderVal] = useState<number>(progress);

  const krProgress = Math.round(
    (((isBoolean ? switchVal : sliderVal) - kr?.start) /
      (kr?.target - kr?.start)) *
      100
  );

  // if (onCollapse) {
  //   openPopup(true);
  // } else {
  //   openPopup(false);
  // }

  const closePopup = () => {
    setSliderVal(progress);
    //openPopup(isCheckedButton);
    openPopup(false);
  };
  const calculateStatus = (progress: number) => {
    const currentQuarter = timePeriods.filter((t) => t._id === quarter)[0];
    const start_date = moment(currentQuarter.startDate).format("YYYY-MM-DD");
    const end_date = moment(currentQuarter.endDate).format("YYYY-MM-DD");
    const current_date = moment().format("YYYY-MM-DD");
    const total_duration = moment(end_date).diff(moment(start_date), "days");

    const current_duration = moment(current_date).diff(
      moment(start_date),
      "days"
    );
    let expected_kr = (current_duration / total_duration) * 100;
    expected_kr = Math.round(expected_kr);

    return getStatusByProgress(progress, expected_kr);
  };

  const onCheckIn = (values: any) => {
    dispatch(
      checkInkrAsync({
        krId: kr?.krsId,
        comment: values.comment,
        current: isBoolean ? (switchVal ? 100 : 0) : sliderVal,
      })
    );
    openPopup(false);
    onFinish();
  };

  const changeValue = (e: any) => {
    if (kr?.start > kr?.target) {
      setSliderVal(kr?.target + kr?.start - e);
    } else {
      setSliderVal(e);
    }
  };

  const Check = (e: any) => {
    return onCollapse ? openPopup(onCollapse) : showPopup;
  };

  useEffect(() => {
    if (kr?.start > kr?.target) {
      setSliderVal(kr?.currentValue);
    } else {
      setSliderVal(progress);
    }
  }, [progress]);

  return (
    <>
      <Popover
        placement="bottom"
        trigger="click"
        style={{ width: 500 }}
        title={
          <>
            {" "}
            Check In{" "}
            <Button
              style={{ float: "right" }}
              size="small"
              onClick={closePopup}
            >
              <CloseOutlined />
            </Button>
          </>
        }
        visible={showPopup}
        content={
          <Space direction="vertical">
            <Space>
              <InputNumber
                min={kr?.start > kr?.target ? kr.target : kr.start}
                max={
                  isBoolean
                    ? 100
                    : kr?.start <= kr?.target
                    ? kr.target
                    : kr.start
                }
                step={isBoolean ? 100 : 1}
                value={isBoolean ? (switchVal ? 100 : 0) : sliderVal}
                //@ts-ignore
                onChange={(val: number) =>
                  isBoolean ? setSwitchVal(val) : setSliderVal(val)
                }
              />
              <Typography.Text type="secondary">
                Target: {kr?.target}
              </Typography.Text>
            </Space>
            <FormBuilder
              onFinish={onCheckIn}
              btnBlock
              submitButtonTitle="Check In"
              btnProps={{ size: "small" }}
              btnLoading={false}
              name="KRProgressSlider"
              formItems={[
                {
                  label: "",
                  name: "comment",
                  initialValue: "",
                  type: {
                    name: "textarea",
                    // @ts-ignore
                    props: { rows: 2, placeholder: "Add optional comment..." },
                  },
                },
              ]}
            />
            {/* <Button size="small" block onClick={closePopup}>
            Close
          </Button> */}
          </Space>
        }
      >
        {/* <Col span={20}>
          <Row align="middle" gutter={16}> */}
        <Row align="middle" gutter={16}>
          <Col span={12} lg={6}>
            <Space>
              <Typography.Text>Start: {`${kr.start}`}</Typography.Text>
              <Typography.Text>Target: {`${kr.target}`}</Typography.Text>
            </Space>
          </Col>
          <SliderCol xs={24} sm={24} md={24} lg={9}>
            {isBoolean ? (
              <Switch
                disabled={!userCanEdit || viewMode}
                // style={{ width: "80%" }}
                defaultChecked={!!progress}
                checkedChildren="Completed"
                unCheckedChildren="Not Done"
                onChange={(val) => {
                  openPopup(true);
                  setSwitchVal(val ? 100 : 0);
                }}
              />
            ) : (
              <StyledSlider
                min={kr?.start > kr?.target ? kr.target : kr.start}
                max={kr?.start <= kr?.target ? kr.target : kr.start}
                disabled={!userCanEdit || viewMode}
                style={{ width: "90%" }}
                trackStyle={{
                  borderWidth: 20,
                }}
                // defaultValue={sliderVal}
                value={
                  kr?.start > kr?.target
                    ? kr?.target + kr?.start - sliderVal
                    : sliderVal
                }
                onChange={(val) => {
                  openPopup(true);
                  setSliderVal(val);
                  changeValue(val);
                }}
                tooltip={{ formatter: () => `${sliderVal}` }}
              />
            )}
          </SliderCol>
          <Col span={12} lg={8} style={{ paddingLeft: "0px" }}>
            <Row align="middle">
              <Col span={6}>
                <Typography.Text>{krProgress.toFixed(1)}%</Typography.Text>
              </Col>
              <Col span={12}>
                {"Status: "}
                <Typography.Text
                  style={{
                    // @ts-ignore
                    color: getStatusColorPro(calculateStatus(krProgress)),
                  }}
                  // type={getStatusColor(calculateStatus(krProgress))}
                >
                  {startCase(calculateStatus(krProgress))}
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Tooltip title="Check In">
                  <Button
                    type="text"
                    style={{ outline: "true" }}
                    onClick={() => {
                      if (showPopup) {
                        openPopup(false);
                      } else {
                        openPopup(true);
                      }
                    }}
                  >
                    Check In
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          {/* <Col span={3}>
          <Typography.Text>{krProgress.toFixed(1)}%</Typography.Text>
        </Col> */}
          {/* <Col span={5}>
          {"Status: "}
          <Typography.Text
            style={{
              // @ts-ignore
              color: getStatusColorPro(calculateStatus(krProgress)),
            }}
            // type={getStatusColor(calculateStatus(krProgress))}
          >
            {startCase(calculateStatus(krProgress))}
          </Typography.Text>
        </Col> */}
          {/* </Row>
        </Col> */}
        </Row>
      </Popover>
    </>
  );
};

export default CheckinPopup;

const StyledSlider = styled(Slider)`
  width: 80%;
  margin: 0px;
`;

const SliderCol = styled(Col)`
  @media screen and (max-width: 992px) {
    order: 4;
  }
`;
