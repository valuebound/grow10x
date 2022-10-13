import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Tag,
  Table,
  Tabs,
  PageHeader,
  Button,
  Dropdown,
  Space,
  Menu,
  Typography,
} from "antd";
import { LockOutlined, MoreOutlined } from "@ant-design/icons";

import {
  updateTimePeriodsAsync,
  deleteTimePeriodsAsync,
} from "./timeperiodSlice";
import {
  updateNotificationAsync,
  getOrganisationProfileAsync,
  selectNotification,
} from "./notificationsSlice";
import { Periods as TimeCycleModal, Notifications } from "./components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllTimePeriodsAsync, selectTime } from "./timeperiodSlice";
import moment from "moment";

const { TabPane } = Tabs;

const TimePeriods: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isTimeperiod, setTimeperiod] = useState<boolean>(true);
  const { data, status } = useAppSelector(selectTime);
  const { organisation } = useAppSelector(selectNotification);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState({});
  const loading = status === "loading";

  let CHECKIN_TITLE = "Individual Check-in reminder";
  let CHECKIN_SUBTITLE = "(Sent to owners of the OKR)";
  let WEEKLY_TITLE = "Weekly Summary Emails";
  let WEEKLY_SUBTITLE = "(Sent to everyone in the company)";

  const handleCloseModal = () => setOpenCreateModal(false);

  const onSubmitReminders = (values: any) => {
    dispatch(
      updateNotificationAsync({
        settings: {
          weeklySummary: {
            ...organisation.settings.weeklySummary,
          },
          reminders: {
            ...values,
            time: moment(values.time).format("HH:mm"),
          },
        },
      })
    );

    dispatch(getOrganisationProfileAsync());
  };

  const onSubmitWeeklySummary = (values: any) => {
    dispatch(
      updateNotificationAsync({
        settings: {
          weeklySummary: {
            ...values,
            time: moment(values.time).format("HH:mm"),
          },
          reminders: {
            ...organisation.settings.reminders,
          },
        },
      })
    );

    dispatch(getOrganisationProfileAsync());
  };

  const showTimePeriod = (values: any) => {
    setTimeperiod(values !== "Notifications");
  };

  const onOpenCreateModal = () => {
    setEditMode(false);
    setOpenCreateModal(true);
    setCurrentRow({});
  };

  const rowMenu = [
    {
      key: "1",
      onClick: (record: any) => () => {
        dispatch(updateTimePeriodsAsync({ ...record, isCurrent: true }));
        setTimeout(() => {
          dispatch(getAllTimePeriodsAsync());
        }, 1500);
      },
      label: "Make Current",
    },
    {
      key: "2",
      onClick: (record: any) => () => {
        dispatch(updateTimePeriodsAsync({ ...record, isLocked: true }));
        setTimeout(() => {
          dispatch(getAllTimePeriodsAsync());
        }, 1500);
      },
      label: "Lock Period",
    },
    {
      key: "3",
      label: "Edit period",
      onClick: (record: any) => () => {
        setEditMode(true);
        setOpenCreateModal(true);
        setCurrentRow(record);
      },
    },
    {
      key: "4",
      onClick: (record: any) => () => {
        dispatch(deleteTimePeriodsAsync({ ...record })).then(() =>
          dispatch(getAllTimePeriodsAsync())
        );
      },
      danger: true,
      label: "Delete Period",
    },
    {
      key: "5",
      onClick: (record: any) => () => {
        dispatch(updateTimePeriodsAsync({ ...record, isLocked: false }));
        setTimeout(() => {
          dispatch(getAllTimePeriodsAsync());
        }, 1500);
      },
      label: "UnLock Period",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: any, record: any) => (
        <Space>
          {`${value.split(" ")[0]} - ${new Date(
            record.startDate
          ).getFullYear()}`}
          {record.isCurrent && <StyledTag>current</StyledTag>}
          {record.isLocked && <LockOutlined />}
        </Space>
      ),
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: any, record: any) => (
        <Typography.Text>
          {moment(new Date(value), "DD/MM/YYYY").format("MMMM DD, YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
      render: (value: any, record: any) => (
        <Typography.Text>
          {moment(new Date(value), "DD/MM/YYYY").format("MMMM DD, YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const getDisabledFlag = (key: string) => {
          if (key === "1") {
            return record.isCurrent;
          }
          if (key === "2" || key === "3") {
            return record.isLocked;
          }
          if (!record.isLocked && key === "5") {
            return !record.isLocked;
          }
          return false;
        };

        return (
          <StyledDropdown
            overlay={
              <Menu>
                {rowMenu.map((item) => (
                  <Menu.Item
                    key={item.label}
                    disabled={getDisabledFlag(item.key)}
                    onClick={item.onClick(record)}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <MoreIcon />
          </StyledDropdown>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllTimePeriodsAsync());
    dispatch(getOrganisationProfileAsync());
  }, [dispatch]);

  return (
    <>
      <PageHeader
        title="Time Period"
        extra={[
          isTimeperiod && (
            <Button type="primary" onClick={onOpenCreateModal}>
              Add Time Period
            </Button>
          ),
        ]}
      />
      <Tabs
        style={{ margin: "0 20px" }}
        size="large"
        onTabClick={(e) => showTimePeriod(e)}
      >
        <TabPane key="Time Period" tab="Time Period">
          <Table columns={columns} dataSource={data} loading={loading} />
        </TabPane>
        <TabPane key="Notifications" tab="Notifications">
          <Notifications
            title={CHECKIN_TITLE}
            subtitle={CHECKIN_SUBTITLE}
            initialValues={organisation?.settings?.reminders}
            onSubmit={onSubmitReminders}
            loading={loading}
            showCheckBox={false}
          />
          <br />
          <Notifications
            title={WEEKLY_TITLE}
            subtitle={WEEKLY_SUBTITLE}
            initialValues={organisation?.settings?.weeklySummary}
            onSubmit={onSubmitWeeklySummary}
            loading={loading}
            showCheckBox={false}
          />
        </TabPane>
      </Tabs>
      {openCreateModal && (
        <TimeCycleModal
          editMode={editMode}
          loading={loading}
          initialValues={currentRow}
          visible={openCreateModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TimePeriods;

const StyledTag = styled(Tag)`
  margin-left: 10px;
`;

const StyledDropdown = styled(Dropdown)`
  margin-left: 20px;
`;

const MoreIcon = styled(MoreOutlined)`
  font-size: 25px;
`;
