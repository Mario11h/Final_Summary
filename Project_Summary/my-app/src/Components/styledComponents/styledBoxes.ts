import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledProjectHeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 16px',
  marginBottom: '24px',
  minHeight: '35px',

  boxSizing: 'border-box', // Include padding and border in the element's total width and height
});

