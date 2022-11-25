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
  Popover,
} from "antd";
import styled from "styled-components";

import { OKRList, Logo } from "../components";
import {
  OKR_TYPE,
  ROLES,
  currentUser,
  getCompanyId,
} from "../../../utils/constants";
import { updateCompanyAbout, getCompanyAbout, selectOkr } from "../okrSlice";
import { getAllTimePeriodsAsync } from "../../TimePeriod/timeperiodSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import FormBuilder from "../../../components/FormBuilder";

const { TabPane } = Tabs;
const { Text, Title, Paragraph } = Typography;

type CompanyInfoProps = {};

const CompanyInfo: React.FC<CompanyInfoProps> = () => {
  const [visible, setVisible] = useState(false);
  const [isAbout, setAbout] = useState<boolean>(true);
  // const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { aboutData, status } = useAppSelector(selectOkr);
  const loading = status === "loading";
  const companyData = getCompanyId();
  const companyId = companyData?.id?.length > 0;

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
              <Popover
                content={
                  <Logo logoUrl={aboutData?.logoUrl} logo={aboutData?.logo} />
                }
                placement="rightBottom"
              >
                {aboutData?.logoUrl ? (
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    src={aboutData?.logoUrl}
                  />
                ) : (
                  <StyledAvatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  >
                    {aboutData?.orgName && aboutData?.orgName[0]}
                  </StyledAvatar>
                )}
              </Popover>
            }
          />
          <Row>
            {/* <Col span={2} /> */}
            <Col span={22}>
              <Title level={4}>{aboutData.orgName}</Title>
            </Col>
            <Col md={2} sm={3} xs={3}>
              {(currentUser?.role === ROLES.ADMIN ||
                (currentUser?.role === ROLES.SUPER_ADMIN && companyId)) &&
                isAbout && (
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
                    <Text> Company Briefs </Text>
                  </Space>
                </>
              }
            >
              <Paragraph>{aboutData.companyBrief}</Paragraph>
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
                    <Text> Vision </Text>
                  </Space>
                </>
              }
            >
              <Paragraph>{aboutData.vision}</Paragraph>
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
                    <Text> Mission </Text>
                  </Space>
                </>
              }
            >
              <Paragraph>{aboutData.mission}</Paragraph>
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
                    <Text> Core Values </Text>
                  </Space>
                </>
              }
            >
              <Paragraph>{aboutData.coreValues}</Paragraph>
            </CoreValuesCard>
          </TabPane>
          {(currentUser?.role === ROLES.ADMIN ||
            (currentUser?.role === ROLES.SUPER_ADMIN && companyId)) && (
            <TabPane tab="OKR" key="2">
              <OKRList okrType={OKR_TYPE.CompanyWide} showHeader />
            </TabPane>
          )}
        </Tabs>
      </Card>
      {visible && (
        <Drawer
          title="Edit Company details"
          placement="right"
          contentWrapperStyle={{ width: "100%", maxWidth: "500px" }}
          onClose={onClose}
          visible={visible}
        >
          <FormBuilder
            name="Edit About"
            width={"100%"}
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
        </Drawer>
      )}
    </>
  );
};

export default CompanyInfo;

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
