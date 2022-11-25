import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Divider,
  Progress,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { startCase } from "lodash";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { getOrgChartData, selectPeople } from "../../../peopleSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  getProgressColorByStatus,
  getStatusColor,
} from "../../../../../utils/constants";
import OKRProgress from "../../OKRProgress";
import { Tree, TreeNode } from "react-organizational-chart";
import Loading from "../../../../../components/Loading";
import { CloseOutlined, RedoOutlined } from "@ant-design/icons";

type OrgChartProps = {
  activeTab: any;
};

const OrgChartUsingDiv: React.FC<OrgChartProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch();
  const { orgChartData, status } = useAppSelector(selectPeople);
  const loading = status === "loading";
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [currentNode, setCurrentNode] = useState({});

  const closeModal = () => setShowModal(false);
  const toogleShowHover = (data: any) => {
    setCurrentNode(data);
  };

  const ChartNode = (props: any) => {
    const data = props?.data;
    return (
      <StyledNode
        onMouseEnter={(e) => {
          toogleShowHover(data);
        }}
        onClick={() => {
          setUser({
            // @ts-ignore
            _id: data?.id || "",
            // @ts-ignore
            firstName: data?.value?.name,
          });
          setShowModal(true);
        }}
      >
        <OnHoverElement data={currentNode} />
        <Typography.Title level={5}>{data?.value?.name}</Typography.Title>
        <Typography.Text>{data?.value?.title}</Typography.Text>
      </StyledNode>
    );
  };

  const OnHoverElement = (props: any) => {
    const data = props?.data?.value;
    return (
      <HoverContainer>
        <Row>
          <StatTitle>
            <span style={{ color: "black" }}>Overall Progress : </span>{" "}
            {data?.items?.overallProgress || 0}%
          </StatTitle>
          <Divider type="vertical" style={{ height: "30px" }} />
          <StatTitle
            // @ts-ignore
            type={getStatusColor(data?.items?.overallStatus) || "danger"}
          >
            {startCase(data?.items?.overallStatus || "Not yet Calculated")}
          </StatTitle>
          <Progress
            // @ts-ignore
            status={
              getProgressColorByStatus(data?.items?.overallStatus) || "normal"
            }
            percent={data?.items?.overallProgress}
            size="small"
            showInfo={false}
          />
        </Row>
      </HoverContainer>
    );
  };

  const GetElements = (props: any) => {
    const d = props?.d;
    return (
      <TreeNode label={<ChartNode data={d} />}>
        {d?.children?.map((e: any) => {
          return <GetElements d={e} />;
        })}
      </TreeNode>
    );
  };

  useEffect(() => {
    if (activeTab === "Organization") {
      dispatch(getOrgChartData());
    }
  }, [activeTab, dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <TransformWrapper
          initialScale={1 / (orgChartData?.children?.length || 0 + 1)}
          minScale={0.1}
          initialPositionX={0}
          initialPositionY={100}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <ChartContainer>
                <Tooltip title="reset graph">
                  <ToolbarButton
                    icon={<RedoOutlined />}
                    onClick={() => resetTransform()}
                    style={{}}
                  >
                    Reset
                  </ToolbarButton>
                </Tooltip>
                <TransformComponent
                  wrapperStyle={{ height: 400, width: "100%" }}
                >
                  <Tree
                    lineWidth={"2px"}
                    lineColor={"green"}
                    lineBorderRadius={"10px"}
                    label={<ChartNode data={orgChartData} />}
                  >
                    {orgChartData?.children.map((d: any) => (
                      <GetElements d={d} />
                    ))}
                  </Tree>
                </TransformComponent>
              </ChartContainer>
            </>
          )}
        </TransformWrapper>
      )}

      {showModal && (
        <OKRProgress open={showModal} onClose={closeModal} row={user} />
      )}
    </Container>
  );
};

export default React.memo(OrgChartUsingDiv);

const Container = styled.div``;

const ChartContainer = styled(Card)`
  overflow: hidden;
  height: 400px;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  :active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

const StatTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
`;

const HoverContainer = styled.div`
  min-width: 350px;
  display: none;
  min-height: 60px;
  padding: 5px;
  position: absolute;
  top: 50px;
  bottom: 50px;
  background-color: white;
  box-shadow: 0px 0px 10px #cfcfcf;
  border-radius: 5px;
  z-index: 34;
`;

const StyledNode = styled.div`
  padding: 5px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;

  :hover {
    cursor: pointer;
  }

  :hover ${HoverContainer} {
    display: block;
  }
`;
const ToolbarButton = styled(Button)`
  position: absolute;
  top: 10;
  margin-bottom: 5px;
  z-index: 5;
`;
