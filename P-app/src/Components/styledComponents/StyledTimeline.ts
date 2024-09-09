import styled from "@emotion/styled";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import WestIcon from "@mui/icons-material/West";

export const StyledTimeline = styled(Timeline)({
  width: "100%",
});

export const StyledTimelineConnector = styled(TimelineConnector)({
  backgroundColor: "black",
  minHeight: "20px",
});

export const StyledTimelineDotPerson = styled(TimelineDot)({
  backgroundColor: "rgba(4, 36, 106, 1)",
  color: "white",
});

export const StyledTimelineDotDone = styled(TimelineDot)({
  color: "white",
  backgroundColor: "rgba(4, 164, 132, 1)",
});

export const StyledTimelineDot = styled(TimelineDot)({
  backgroundColor: "white",
  border: "2px solid navy",
  color: "navy",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  lineHeight: 1,
});

export const StyledDiv = styled.div({
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  position: "relative",
});

export const StyledDivEnd = styled.div({
  marginTop: "20px",
});

export const StyledArrowBackIcon = styled(WestIcon)({
  color: "#1976d2",
  marginRight: "4px",
  fontSize: "2rem",
});

export const ArrowContainer = styled.div({
  position: "absolute",
  right: "100px",
  bottom: "-10px",
});
