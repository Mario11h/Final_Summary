import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledIconNoBackground = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(4, 36, 106, 1)",
  color: "white",
  marginLeft: "15px",
});

export const StyledIconGreyBackground = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#D3D3D3",
  color: "rgba(4, 36, 106, 1)",
});

export const StyledIconGreenBackground = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(4, 164, 132, 1)",
  color: "white",
});

export const StyledIconBox = styled(Box)({
  position: "absolute",
  top: "-30px",
  right: "8px",
});

export const StyledIconMulIcon = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px", // Size for the background circle
  height: "40px", // Size for the background circle
  borderRadius: "50%",
  flexShrink: 0, // Prevent shrinking

  svg: {
    width: "40px", // Size for the icon
    height: "40px", // Size for the icon
  },
});
