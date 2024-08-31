import styled from 'styled-components';

export const StyledButton = styled('button')({
  backgroundColor: 'rgba(4, 36, 106, 1)',
  color: 'white',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '4px',
  margin: '0 5px',
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: '#0056b3',
  },

  '&:disabled': {
    backgroundColor: '#d6d6d6',
    cursor: 'not-allowed',
  },
});

