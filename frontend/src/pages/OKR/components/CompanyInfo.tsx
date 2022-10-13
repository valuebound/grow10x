import React, { useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Typography,
  Avatar,
  Button,
  Drawer,
  Space,
  Row,
  Col,
} from "antd";
import styled from "styled-components";

import { OKRList } from "../components";
import { OKR_TYPE, ROLES, currentUser } from "../../../utils/constants";
import { updateCompanyAbout, getCompanyAbout, selectOkr } from "../okrSlice";
import { getAllTimePeriodsAsync } from "../../TimePeriod/timeperiodSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import FormBuilder from "../../../components/FormBuilder";

const { TabPane } = Tabs;

type CompanyInfoProps = {};

const CompanyInfo: React.FC<CompanyInfoProps> = () => {
  const [visible, setVisible] = useState(false);
  const [isAbout, setAbout] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { aboutData, status } = useAppSelector(selectOkr);
  const loading = status === "loading";

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  useEffect(() => {
    dispatch(getAllTimePeriodsAsync());
    dispatch(getCompanyAbout());
  }, [dispatch]);

  const showAbout = (values: any) => {
    if (values == 2) {
      setAbout(false);
    } else {
      setAbout(true);
    }
  };

  const onFinish = (payload: any) => {
    dispatch(updateCompanyAbout(payload));
    setVisible(false);
  };

  return (
    <>
      <CompanyInfoCard>
        <Card
          loading={loading}
          cover={
            <img
              alt="company cover iamge"
              src={require("../../../assets/CompanyCover.png")}
            />
          }
        >
          <Card.Meta
            avatar={
              aboutData?.companyLogo ? (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={require("../../../assets/logo.png")}
                />
              ) : (
                <StyledAvatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                >
                  {aboutData?.orgName && aboutData?.orgName[0]}
                </StyledAvatar>
              )
            }
          />
          <Row>
            <Col span={2} />
            <Col span={21}>
              <Typography.Title level={4}>{aboutData.orgName}</Typography.Title>
            </Col>
            <Col span={1}>
              {currentUser?.role === ROLES.ADMIN && isAbout && (
                <Button type="primary" onClick={showDrawer}>
                  Edit
                </Button>
              )}
            </Col>
          </Row>
        </Card>
      </CompanyInfoCard>

      <Card>
        <Tabs defaultActiveKey="1" onTabClick={(e) => showAbout(e)}>
          <TabPane tab="About" key="1">
            <CompanyBriefsCard
              loading={loading}
              title={
                <>
                  <Space>
                    <Avatar
                      size="small"
                      src={require("../../../assets/fire.png")}
                    />
                    <Typography.Text> Company Briefs </Typography.Text>
                  </Space>
                </>
              }
            >
              <Typography.Paragraph>
                {aboutData.companyBrief}
              </Typography.Paragraph>
            </CompanyBriefsCard>
            <VisionCard
              loading={loading}
              title={
                <>
                  <Space>
                    <Avatar
                      size="small"
                      src={require("../../../assets/bullseye.png")}
                    />
                    <Typography.Text> Vision </Typography.Text>
                  </Space>
                </>
              }
            >
              <Typography.Paragraph>{aboutData.vision}</Typography.Paragraph>
            </VisionCard>
            <MissionCard
              loading={loading}
              title={
                <>
                  <Space>
                    <Avatar
                      size="small"
                      src={require("../../../assets/fire.png")}
                    />
                    <Typography.Text> Mission </Typography.Text>
                  </Space>
                </>
              }
            >
              <Typography.Paragraph>{aboutData.mission}</Typography.Paragraph>
            </MissionCard>
            <CoreValuesCard
              loading={loading}
              title={
                <>
                  <Space>
                    <Avatar
                      size="small"
                      src={require("../../../assets/bullseye.png")}
                    />
                    <Typography.Text> Core Values </Typography.Text>
                  </Space>
                </>
              }
            >
              <Typography.Paragraph>
                {aboutData.coreValues}
              </Typography.Paragraph>
            </CoreValuesCard>
          </TabPane>
          <TabPane tab="OKR" key="2">
            <OKRList okrType={OKR_TYPE.CompanyWide} showHeader />
          </TabPane>
        </Tabs>
      </Card>
      {visible && (
        <Drawer
          title="Edit Company details"
          placement="right"
          width={500}
          onClose={onClose}
          visible={visible}
        >
          <Container>
            <FormBuilder
              name="Edit About"
              width={450}
              btnLoading={loading}
              onFinish={onFinish}
              initialValues={aboutData}
              submitButtonTitle="Save"
              formItems={[
                {
                  label: "Company Briefs",
                  name: "companyBrief",
                  rules: [{ required: false }],
                  type: {
                    name: "textarea",
                    // @ts-ignore
                    props: { rows: 5 },
                  },
                },
                {
                  label: "Vision",
                  name: "vision",
                  rules: [{ required: false }],
                  type: {
                    name: "textarea",
                    // @ts-ignore
                    props: { rows: 5 },
                  },
                },
                {
                  label: "Mission",
                  name: "mission",
                  rules: [{ required: false }],
                  type: {
                    name: "textarea",
                    // @ts-ignore
                    props: { rows: 5 },
                  },
                },
                {
                  label: "Core Values",
                  name: "coreValues",
                  rules: [{ required: false }],
                  type: {
                    name: "textarea",
                    // @ts-ignore
                    props: { rows: 5 },
                  },
                },
              ]}
            />
          </Container>
        </Drawer>
      )}
    </>
  );
};

export default CompanyInfo;

const Container = styled.div`
  width: 90%;
  max-width: 400px;
`;

const CompanyInfoCard = styled.div`
  margin-bottom: 15px;
`;

const VisionCard = styled(Card)`
  background-color: #cbf3f0;
  margin-bottom: 15px;
  box-shadow: 1px 1px 12px rgba(203, 243, 240, 1);
`;

const MissionCard = styled(Card)`
  background-color: #faedcd;
  margin-bottom: 15px;
  box-shadow: 1px 1px 12px rgba(250, 237, 205, 0.8);
`;

const CompanyBriefsCard = styled(Card)`
  background-color: #faedcd;
  margin-bottom: 15px;
  box-shadow: 1px 1px 12px rgba(250, 237, 205, 0.8);
`;

const CoreValuesCard = styled(Card)`
  background-color: #cbf3f0;
  margin-bottom: 15px;
  box-shadow: 1px 1px 12px rgba(203, 243, 240, 1);
`;

const StyledAvatar = styled(Avatar)`
  background-color: #ee6c4d;
  margin-top: -60px;
  border: 3px solid #eee;
`;
