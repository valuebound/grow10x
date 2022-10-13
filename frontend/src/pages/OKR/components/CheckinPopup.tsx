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

type CheckinPopupProps = {
  progress: number;
  kr: Kr;
  onFinish: any;
  isBoolean: boolean;
  viewMode?: boolean;
  okrOwnerId: string;
  timePeriods: any[];
  quarter: string;
};

const CheckinPopup: React.FC<CheckinPopupProps> = ({
  progress,
  kr,
  onFinish,
  isBoolean,
  viewMode = false,
  okrOwnerId,
  timePeriods,
  quarter
}) => {
  const dispatch = useAppDispatch();
  const userCanEdit = currentUser?.userid === okrOwnerId;

  const [showPopup, openPopup] = useState<boolean>(false);
  const [switchVal, setSwitchVal] = useState<number>(progress);
  const [sliderVal, setSliderVal] = useState<number>(progress);

  const krProgress =
    Math.round((((isBoolean ? switchVal : sliderVal) - kr?.start) /
      (kr?.target - kr?.start)) *
      100);

  const closePopup = () => {
    setSliderVal(progress)
    openPopup(false)
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

  return (
    <>
      <Typography.Text>Start: {`${kr.start}`}</Typography.Text>
      <Typography.Text>Target: {`${kr.target}`}</Typography.Text>
      <Popover
        placement="bottom"
        trigger="click"
        style={{ width: 500 }}
        title="Check In"
        visible={showPopup}
        content={
          <Space direction="vertical">
            <Space>
              <InputNumber
                min={0}
                max={isBoolean ? 100 : kr.target}
                step={isBoolean ? 100 : 1}
                value={isBoolean ? (switchVal ? 100 : 0) : sliderVal}
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
            <Button size="small" block onClick={closePopup}>
              Close
            </Button>
          </Space>
        }
      >
        <Col span={3}>
          {isBoolean ? (
            <Switch
              disabled={!userCanEdit || viewMode}
              style={{ width: 130 }}
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
              min={kr?.start}
              max={kr?.target}
              disabled={!userCanEdit || viewMode}
              trackStyle={{
                borderWidth: 20,
              }}
              defaultValue={sliderVal}
              value={sliderVal}
              onChange={(val) => {
                openPopup(true);
                setSliderVal(val);
              }}
            />
          )}
        </Col>
      </Popover>
      <Col span={1}>
        <Typography.Text>{krProgress.toFixed(1)}%</Typography.Text>
      </Col>
      <Col span={2}>
        {"Status: "}
        <Typography.Text
          // @ts-ignore
          style={{ color: getStatusColorPro(calculateStatus(krProgress)) }}
          // type={getStatusColor(calculateStatus(krProgress))}
        >
          {startCase(calculateStatus(krProgress))}
        </Typography.Text>
      </Col>
    </>
  );
};

export default CheckinPopup;

const StyledSlider = styled(Slider)`
  width: 120px;
`;
