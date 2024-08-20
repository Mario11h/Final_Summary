import styled from '@emotion/styled';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import WestIcon from '@mui/icons-material/West';

export const StyledTimeline = styled(Timeline)({
  padding: 0,
  margin: 0,
  width: '100%',
});

export const StyledTimelineItem = styled(TimelineItem)({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'row',
});

export const StyledTimelineSeparator = styled(TimelineSeparator)({
  flex: 0,
});

export const StyledTimelineConnector = styled(TimelineConnector)({
  backgroundColor: 'black',
  minHeight: '20px', // Adjust the height as needed
});

export const StyledTimelineContent = styled(TimelineContent)({
  padding: '6px 16px',
  flex: 1,
  textAlign: 'left',
});

export const StyledTimelineDotPerson = styled(TimelineDot)({
  backgroundColor: 'rgba(4, 36, 106, 1)',
  color: 'white',
});

export const StyledTimelineDotDone = styled(TimelineDot)({
  color: 'white',
  backgroundColor: 'rgba(4, 164, 132, 1)',
});

export const StyledTimelineDot = styled(TimelineDot)({
  backgroundColor: 'white',
  border: '2px solid navy',
  color: 'navy',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  lineHeight: 1,
});

export const StyledDiv = styled.div({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
});

export const StyledDivEnd = styled.div({
  marginTop: '20px',
});

export const StyledArrowBackIcon = styled(WestIcon)({
  color: '#1976d2',
  marginRight: '4px',
  fontSize: '2rem',
});

export const LeftDiv = styled.div({
  maxWidth: '50%',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
});

export const RightDiv = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: '8px',
});

export const ArrowContainer = styled.div({
  position: 'absolute',
  left: '80%',
  bottom: '-10px',
  transform: 'translateX(-200%)',
});
