// styledIconAvatar.tsx
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledIconNoBackground = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;  // Size for the background circle
  height: 40px; // Size for the background circle
  border-radius: 50%;
  background-color: rgba(4, 36, 106, 1);
  color: white;
  flex-shrink: 0; // Prevent shrinking
`;

export const StyledIconGreyBackground = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;  // Size for the background circle
  height: 40px; // Size for the background circle
  border-radius: 50%;
  background-color: #D3D3D3; // Grey background
  color: rgba(4, 36, 106, 1); // Inherit color from parent or set a default color
  flex-shrink: 0; // Prevent shrinking
  
`;

export const StyledIconGreenBackground = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  // Size for the background circle
  height: 40px; // Size for the background circle
  border-radius: 50%;
  background-color: rgba(4, 164, 132, 1); // Corrected: removed comma
  color: white; // Inherit color from parent or set a default color
  flex-shrink: 0; // Prevent shrinking
  position: absolute;
  top: -30px;
  right: 8px;
  
`;

export const StyledIconBox = styled(Box)`
  position: absolute;
  top: -30px;
  right: 8px;
`;

export const StyledIconMulIcon = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;  // Size for the background circle
  height: 40px; // Size for the background circle
  border-radius: 50%;
  
  flex-shrink: 0; // Prevent shrinking
  svg {
    width: 40px;  // Size for the icon
    height: 40px; // Size for the icon
  }
`;

