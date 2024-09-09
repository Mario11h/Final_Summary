import { Box, Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const FilterContainer = styled(Grid)({
  height: "100%",
  display: "flex",
});

export const FilterBox = styled(Box)({
  height: "100%",
  padding: "10px 15px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "33%",
});

export const FilterBoxLabel = styled(Typography)({
  color: "darkblue",
  fontSize: "20px !important",
  fontWeight: "500 !important",
});

export const FilterButtonContainer = styled(Grid)({
  padding: "10px 15px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
});

export const FilterButtonWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
});

export const SearchContainersButton = styled(Button)({
  width: "100%",
  backgroundColor: "darkblue !important",
  color: "white !important",
  height: "40px",
  fontWeight: "bold",
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: "red !important",
    color: "white",
  },
  fontSize: "8px !important",
  "@media (min-width:600px)": {
    fontSize: "8px !important",
  },
  "@media (min-width:960px)": {
    fontSize: "8px !important",
  },
  "@media (min-width:1280px)": {
    fontSize: "10px !important",
  },
  "@media (min-width:1920px)": {
    fontSize: "12px !important",
  },
});
