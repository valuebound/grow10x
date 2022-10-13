import React from "react";
import styled from "styled-components";
import { Space, Spin } from "antd";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Container>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  /* width: 100%;
  height: 300px; */
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdede;
  opacity: 0.6;
  z-index: 100;
`;
