import React from "react";
import { Box, Container } from "@mui/material";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const ContentContainer = styled(Box)`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const MainLayout: React.FC = () => {
  return (
    <Container>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Container>
  );
};
