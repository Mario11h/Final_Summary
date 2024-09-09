import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled(Grid)({
  height: "60px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const NavbarLogoSection = styled(Grid)({
  height: "100%",
});

export const NavbarLinksSection = styled(Grid)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const NavbarLink = styled(Link)({
  textDecoration: "none",
  fontWeight: "600",
  fontFamily: "Roboto, sans-serif",
  color: "darkblue",
  "&:hover": {
    textDecoration: "underline",
  },
  "&:focus, &:active": {
    color: "red",
    textDecoration: "underline",
  },
});

export const NavbarLogoutSection = styled(Grid)({
  height: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
});
