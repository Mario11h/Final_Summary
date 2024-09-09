import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const StyledTitleGreyBackground = styled(Typography)({
  color: '#003366',
  padding: '5px 10px',
  fontSize: '18px', 
  fontWeight: 'bold', 
  fontFamily: 'roboto',
});

export const ProjectName = styled(Typography)({
  color: '#003366', 
  fontSize: '24px', 
  fontWeight: 'bold', 
  fontFamily: 'roboto',
  marginBottom: '5px', 
});

export const ProjectCode = styled(Typography)({
  color: 'grey',
  fontSize: '16px', 
  fontWeight: 'normal',
  fontFamily: 'roboto',
});

// Calibri font styled component
export const TextRoboto = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '16px',
  color: '#000',
  marginLeft:'7px'
});

export const CalibriText12P = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '16px', 
  color: '#000',
  paddingTop: '15px',
  paddingLeft: '20px',
});

export const CalibriText12Navy = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'rgba(4, 36, 106, 1)', 
  gap: '10px',
  display: 'flex',
  flexDirection: 'column', 
  marginLeft: '8px',
  marginTop: '8px',
});

// Bulleted list styled component
export const BulletedList = styled('ul')({
  fontFamily: 'roboto',
  fontSize: '16px', 
  color: '#000', 
  listStyleType: 'disc', // Use bullets for list items
});

// Label-Value item styled component
export const LabelValueItem = styled('li')({
  marginBottom: '5px', // Add space between items
});

// Label styled component
export const Label = styled('span')({
  fontWeight: 'bold', // Set label font to bold
  fontSize: '16px',
  marginRight: '4px',
});

// Value styled component
export const Value = styled('span')({
  fontWeight: 'normal', // Set value font to normal
});

// Ongoing status styled component
export const OngoingText = styled(Typography)<{ status: string }>(({ status }) => ({
  backgroundColor: (() => {
    switch (status) {
      case 'ONGOING':
        return 'rgba(226, 1, 1, 1)';
      case 'ON HOLD':
        return 'rgba(7, 62, 183, 1)';
      case 'FINISHED':
        return 'rgba(4, 164, 132, 1)';
      case 'REQUESTED':
        return 'rgba(61, 34, 53, 0.7)';
      default:
        return 'transparent';
    }
  })(),
  color: 'white',
  fontFamily: 'roboto',
  fontSize: '18px',
  textTransform: 'uppercase',
  padding: '5px 10px',
  display: 'inline-block',
  marginRight: 0,
  boxShadow: (() => {
    switch (status) {
      case 'ONGOING':
        return '0px 4px 15px rgba(226, 1, 1, 0.5)';
      case 'ON HOLD':
        return '0px 4px 15px rgba(7, 62, 183, 0.5)';
      case 'FINISHED':
        return '0px 4px 15px rgba(4, 164, 132, 0.5)';
      case 'REQUESTED':
        return '0px 4px 15px rgba(61, 34, 53, 0.5)';
      default:
        return 'none';
    }
  })(),
}));

export const CalibriBoldNavy14 = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '16px',
  fontWeight: 'bold', 
  color: '#003366', 
});

export const CalibriBoldNavy11 = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '12px',
  fontWeight: 'bold', 
  color: '#003366',
});

export const CalibriBoldRed11 = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '14px',
  fontWeight: 'bold', 
  color: 'rgba(226, 1, 1, 1)',
});

export const CalibriBoldNavy18 = styled(Typography)({
  fontFamily: 'roboto',
  fontSize: '18px', 
  fontWeight: 'bold', 
  color: '#003366',
});

export const StyledTitle = styled(Typography)({
  color: '#003366', 
  fontSize: '18px', 
  fontWeight: 'bold', 
  fontFamily: 'roboto',
  marginBottom: '10px', 
  display: 'flex',
  marginLeft: '10px',
});

export const StyledTitleOver = styled(Typography)({
  color: '#003366',
  fontSize: '18px', 
  fontWeight: 'bold', 
  fontFamily: 'roboto',
  marginBottom: '10px', 
  marginLeft: '50px',
  marginTop:'-28px'
});

// Milestone styled component
export const MilestoneText = styled(Typography)({
  backgroundColor: '#003366',
  color: 'white', 
  fontFamily: 'roboto',
  fontWeight: 'bold',
  fontSize: '18px',
  textTransform: 'uppercase',
  padding: '5px 10px', 
  display: 'inline-block',
});
