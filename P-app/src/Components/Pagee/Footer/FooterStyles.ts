import { Box, Grid } from "@mui/material";
import styled from "styled-components";

export const MainContainer = styled(Grid)({
  boxSizing: "border-box",
});

export const FooterSection = styled(Grid)({
  height: "70px",
  width: "100%",
  display: "flex",
  gap: "10px",
  padding: "10px",
  paddingBottom: "2px",
});

export const FooterMidBoxWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
});

export const FooterLinkStyles = {
  fontSize: "12px",
  fontWeight: "600",
  color: "darkblue",
  textDecoration: "underline",
  "&:hover": { color: "red", textDecoration: "none" },
};

export const FooterIconStyles = {
  color: "white",
  backgroundColor: "#003366",
  padding: "10px",
  "&:hover": { backgroundColor: "red" },
};
