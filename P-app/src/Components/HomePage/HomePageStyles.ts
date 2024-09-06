import { styled } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
export const AbsoluteBox = styled("div")({
  position: "absolute",
  left: 0,
  width: "10%",
  height: "8vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const FlexBox = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "16px",
});

export const LogoutBox = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
});

export const BackgroundBox = styled("div")({
  width: "100%",
  height: "60vh",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CenteredTypography = styled("div")({
  position: "relative",
  color: "white",
  textAlign: "center",
  textShadow: "0 4px 8px rgba(4, 36, 106, 1)",
  fontFamily: "roboto",
});

export const StyledTitles = styled(Typography)({
  color: "#003366",
  fontSize: "24px",
  fontWeight: "bold",
  fontFamily: "roboto",
  marginLeft: "10px",
});
export const StyledIcon = styled("div")({
  color: "red",
});

export const TextCont = styled("div")({
  color: "#003366",
  fontSize: "16px",
  fontWeight: "bold",
});

export const ContentFlex = styled("div")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "roboto",
});
export const NumberFetch = styled("div")({
  color: "#003366",
  fontSize: "24px",
  fontFamily: "roboto",
  fontWeight: "bold",
  marginLeft: "10px ",
});
export const Flextxt = styled("div")({
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
  left: 0,
  
});
export const StyledFlextxtButton = styled(Button)({
  color: "blue",
  textDecoration: "underline",
  "&:hover": {
    color: "red",
  },
});

export const VisitorTxt = styled("div")({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

});
export const IconsButton = styled("div")({
  position: "absolute",
  right: 10,
});

// filter box

export const FilterBox = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minHeight:'50vh'
});

export const FilterBoxFilters = styled(Grid)({
  width: "100%",
  height: "35%",
  display: "flex",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  background: "white",
});

export const FilterBoxFiltersMain = styled(Grid)({
  height: "100%",
  display: "flex",
  boxSizing: "border-box",
  padding: "12px",
});

export const FilterBoxFiltersSearch = styled(Grid)({
  height: "100%",
  display: "flex",
  boxSizing: "border-box",
  padding: "12px",
  flexDirection: "column",
  justifyContent: "end",
});

export const SearchContainersButton = styled(Button)({
  width: "100%",
  backgroundColor: "darkblue",
  color: "white",
  height: "50%",
  fontSize: "10px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "darkblue",
    color: "white",
  },
});

export const FilterBoxImageSection = styled(Grid)({
  width: "100%",
  height: "65%",
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
});
