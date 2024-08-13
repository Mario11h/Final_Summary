import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledProjectHeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 24px;
  min-height: 35px; // Set a minimum height
  
  box-sizing: border-box; // Include padding and border in the element's total width and height
`;
