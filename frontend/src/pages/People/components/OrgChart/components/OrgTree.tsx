import { DownOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Divider,
  Popover,
  Progress,
  Row,
  Tree,
  Typography,
} from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getOrgTreeData, selectPeople } from "../../../peopleSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import OKRProgress from "../../OKRProgress";
import { startCase } from "lodash";
import {
  getProgressColorByStatus,
  getStatusColor,
} from "../../../../../utils/constants";

const initTreeData: DataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
          {
            title: "leaf",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: "leaf",
            key: "0-0-1-0",
          },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
          },
          {
            title: "leaf",
            key: "0-0-2-1",
            isLeaf: true,
          },
        ],
      },
    ],
  },
];

const OrgTree: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orgTreeData, status } = useAppSelector(selectPeople);
  const loading = status === "loading";
  const [treeData, setTreeData] = useState(initTreeData);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {};

  const closeModal = () => setShowModal(false);

  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[]
  ): DataNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            { title: "Child Node", key: `${key}-0` },
            { title: "Child Node", key: `${key}-1` },
          ])
        );
        resolve();
      }, 1000);
    });

  const node = (e: any) => {
    return (
      <Popover
        content={
          <Row>
            <StatTitle>
              <span style={{ color: "black" }}>Overall Progress : </span>{" "}
              {e?.value?.overallProgress || 0}%
            </StatTitle>
            <Divider type="vertical" style={{ height: "30px" }} />
            <StatTitle
              // @ts-ignore
              type={getStatusColor(e?.value?.overallStatus) || "danger"}
            >
              {startCase(e?.value?.overallStatus || "Not yet Calculated")}
            </StatTitle>
            <Progress
              // @ts-ignore
              status={
                getProgressColorByStatus(e?.value?.overallStatus) || "normal"
              }
              percent={e?.value?.overallProgress}
              size="small"
              showInfo={false}
            />
          </Row>
        }
      >
        <Node
          bodyStyle={{ padding: 0 }}
          onClick={() => {
            setUser({
              _id: e?.key || "",
              firstName: e?.title,
            });
            setShowModal(true);
          }}
        >
          <Card.Meta
            avatar={<Avatar src={e?.avatar} />}
            title={
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                {e?.title}
              </Typography.Title>
            }
            description={e?.designation}
          />
        </Node>
      </Popover>
    );
  };

  useEffect(() => {
    dispatch(getOrgTreeData());
  }, [dispatch]);

  return (
    <Container loading={loading}>
      <Tree
        showLine
        showIcon={true}
        defaultExpandedKeys={
          orgTreeData.length > 0 ? [orgTreeData[0]?.key] : []
        }
        onSelect={onSelect}
        titleRender={node}
        treeData={orgTreeData}
        // loadData={onLoadData}
      />
      {showModal && (
        <OKRProgress open={showModal} onClose={closeModal} row={user} />
      )}
    </Container>
  );
};

export default OrgTree;

const Container = styled(Card)`
  overflow: auto;
  width: 100%;
  min-height: 400px;

  .ant-tree-indent-unit::before {
    border-right: 2px solid black;
  }
  .ant-tree-switcher-leaf-line::before {
    border-right: 2px solid black;
  }
  .ant-tree-switcher-leaf-line::after {
    border-bottom: 2px solid black;
  }
`;

const Node = styled(Card)`
  padding: 10px;
  padding-right: 20px;
  min-width: 100px;
  box-shadow: 3px 1px 3px grey;

  .ant-card-meta-title {
    margin-bottom: 0px;
  }
  .ant-card-meta-detail > div:not(:last-child) {
    margin-bottom: 0px;
  }
`;

const StatTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
`;
