import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledProjectHeaderBox = styled(Box)<{ status: string }>(({ status }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  marginBottom: '24px',
  minHeight: '35px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
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