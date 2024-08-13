import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// Title with a grey background and centered text Fixed
export const StyledTitleGreyBackground = styled(Typography)`
  background-color: #D3D3D3;
  color: #003366; // Navy blue color
  padding: 5px 10px; // Adjust the padding
  font-size: 18px; // Adjust the font size
  font-weight: bold; // Set the font weight for the title
  font-family: roboto; 
  display: flex;
  width: fit-content; // Ensure the width is only as wide as the content
  align-self: flex-start; // Align to the start
  margin-left: 10px;
  
`;



// Project name styled component FIXED
export const ProjectName = styled(Typography)`
  color: #003366; // Navy blue color
  font-size: 24px; // Larger font size for the project name
  font-weight: bold; // Bold text
  font-family: roboto; // Set font to 
  margin-bottom: 5px; // Margin at the bottom
`;

// Project code styled component FIXED
export const ProjectCode = styled(Typography)`
  color: grey; // Grey color for the code
  font-size: 14px; // Smaller font size for the code
  font-weight: normal; // Normal weight for the code
  font-family: roboto; 
`;

// Calibri font styled component Fixed
export const CalibriText12 = styled(Typography)`
  font-family: roboto;
  font-size: 14px; // Set the font size
  color: #000; // Set the text color
`;


export const CalibriText12P = styled(Typography)`
  font-family: roboto;
  font-size: 14px; // Set the font size
  color: #000; // Set the text color
  padding-top: 15px;
  padding-left: 20px;
`;
//Fixed
export const CalibriText12Navy = styled(Typography)`
  font-family: roboto;
  font-size: 16px; // Set the font size
  font-weight: bold; /* Set the font weight */
  color: rgba(4, 36, 106, 1); /* Set the text color */
  gap: 10px; // Navy blue color
  display: flex;
  flex-direction: column; // Align items in a column
  margin-left: 8px;
  margin-top: 8px; // Add some margin at the top
`;

// Bulleted list styled component Fixed
export const BulletedList = styled.ul`
  font-family: roboto;
  font-size: 12px; // Set the font size
  color: #000; // Set the text color
  list-style-type: disc; // Use bullets for list items
  
`;
// Label-Value item styled component Fixed
export const LabelValueItem = styled.li`
  margin-bottom: 5px; // Add space between items
`;

// Label styled  Fixed
export const Label = styled.span`
  font-weight: bold; // Set label font to bold
  font-size: 14px;
`;

// Value styled component Fixed
export const Value = styled.span`
  font-weight: normal; // Set value font to normal
`;

// Ongoing styled component Fixed
export const OngoingText = styled(Typography)`
  background-color: #e69500; // Orange background
  color: white; // White text color
  font-family:roboto;
  font-size: 18px; // Font size 18px
  text-transform: uppercase; // All caps
  padding: 5px 10px; // Padding
  display: inline-block; // Inline-block for fitting content
  margin-right: 0; 
`;

// Calibri bold navy with font size 14px Fixed
export const CalibriBoldNavy14 = styled(Typography)`

  font-family: 'roboto'; // Calibri font
  font-size: 14px; // Font size 14px
  font-weight: bold; // Bold font weight
  color: #003366; // Navy blue color
`;

// Calibri bold navy with font size 11px Fixed
export const CalibriBoldNavy11 = styled(Typography)`
  font-family: 'roboto'; // Calibri font
  font-size: 11px; // Font size 11px
  font-weight: bold; // Bold font weight
  color: #003366; // Navy blue color

`;
//Fixed
export const CalibriBoldNavy18 = styled(Typography)`
  font-family: 'roboto'; // Calibri font
  font-size: 18px; // Font size 11px
  font-weight: bold; // Bold font weight
  color: #003366; // Navy blue color
`;


// General title without a background Fixed
export const StyledTitle = styled(Typography)`
  color: #003366; // Navy blue color
  font-size: 18px; // Set the font size for the title
  font-weight: bold; // Set the font weight for the title
  font-family: roboto; // Set font to Calibri
  margin-bottom: 10px; // Optional: Add some margin at the bottom
  display: flex;
  margin-left: 10px;
`;

export const StyledTitleOver = styled(Typography)`
  color: #003366; // Navy blue color
  font-size: 18px; // Set the font size for the title
  font-weight: bold; // Set the font weight for the title
  font-family: roboto; // Set font to Calibri
  margin-bottom: 10px; // Optional: Add some margin at the bottom
  display: flex;
  
`;
// Ongoing styled component Fixed
export const MilestoneText = styled(Typography)`
  background-color: #003366; 
  color: white; // White text color
  font-family: 'roboto';
  font-weight: bold;
  font-size: 18px; // Font size 18px
  text-transform: uppercase; // All caps
  padding: 5px 10px; // Padding
  display: inline-block; // Inline-block for fitting content
  

`;