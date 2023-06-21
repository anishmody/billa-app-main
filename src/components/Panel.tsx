import React from "react";
import styled from "styled-components";

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

const PanelWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const PanelHeading = styled.div`
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: #2e5ea1;
  color: white;
`;

const PanelTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 0;
`;

const PanelBody = styled.div`
  padding: 20px;
  background-color: #d0e7eb;
`;

const Panel: React.FC<PanelProps> = ({ title, children }) => (
  <PanelWrapper>
    <PanelHeading>
      <PanelTitle>{title}</PanelTitle>
    </PanelHeading>
    <PanelBody>{children}</PanelBody>
  </PanelWrapper>
);

export default Panel;
