import React from "react";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

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
