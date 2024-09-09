import { Box, Grid } from "@mui/material";
import styled from "styled-components";
import { images } from "../../Components/Assets/DummyData";

export const PageContainer = styled(Grid)({});

export const HomeHeroSection = styled(Grid)({
  backgroundImage: `url(${images[1].imageUrl})`,
  minHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundSize: "cover",
});

export const HomeHeroSectionTextBox = styled(Box)({
  height: "60%",
  width: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  textAlign: "center",
  textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)",
  color: "rgba(255,255,255,0.9)",
});

export const HomeMiddleSection = styled(Grid)({
  minHeight: "400px",
  display: "flex",
  justifyContent: "center",
});

export const HomeMiddleBox = styled(Grid)({
  height: "90%",
  position: "relative",
  top: "-40px",
  backgroundColor: "#F7F7F7",
  alignContent: "space-between",
});

export const HomeMiddleBoxImages = styled(Grid)({
  height: "65%",
  display: "flex",
  justifyContent: "space-between",
});

export const HomeStatsSection = styled(Grid)({
  minHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${images[2].imageUrl})`,
  backgroundSize: "cover",
});

export const StatContainer = styled(Grid)({
  height: "50%",
  background: "white",
  borderRadius: "10px",
});

export const StatBoxWrapper = styled(Grid)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
});

export const StatBoxContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "darkblue",
});

export const StatBoxContentMid = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "darkblue",
  borderLeft: "3px dashed rgba(0,0,0,0.15)",
  borderRight: "3px dashed rgba(0,0,0,0.15)",
});

export const StatBoxNumber = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const iconStyles = {
  color: "red",
  height: "30px",
  width: "30px",
};
