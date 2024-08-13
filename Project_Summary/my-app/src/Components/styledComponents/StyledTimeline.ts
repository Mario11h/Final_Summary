import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import WestIcon from '@mui/icons-material/West';
export const StyledTimeline = styled(Timeline)`
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const StyledTimelineItem = styled(TimelineItem)`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

export const StyledTimelineSeparator = styled(TimelineSeparator)`
  flex: 0;
`;

export const StyledTimelineConnector = styled(TimelineConnector)`
   && {
    background-color: black;
    min-height: 20px; /* Adjust the height as needed */
  }
`;

export const StyledTimelineContent = styled(TimelineContent)`
&&{
  padding: 6px 16px;
  flex: 1;
  text-align: left;
  
}
`;

export const StyledTimelineDotPerson = styled(TimelineDot)`
  && {
    background-color: rgba(4, 36, 106, 1);
    color: white;
  }
`;


export const StyledTimelineDotDone = styled(TimelineDot)`
&& {  
color: white;
  background-color: green;
}
`;

export const StyledTimelineDot = styled(TimelineDot)`
&&{  
background-color: white;
  border: 2px solid navy;
  color: navy;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
}
`;

export const StyledDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;

`;

export const StyledDivEnd = styled.div`
  margin-top: 20px;

`;
export const StyledArrowBackIcon = styled(WestIcon)`
  color: #1976d2;
  margin-right: 4px;
   && {
    font-size: 2rem;
  }
`;


export const LeftDiv = styled.div`
  max-width: 50%;
  word-wrap: break-word;
  overflow-wrap: break-word;

`;

export const RightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  
`;


export const ArrowContainer = styled.div`
  position: absolute;
  left: 80%;
  bottom: -10px;
  transform: translateX(-200%);
`;