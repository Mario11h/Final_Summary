
// import { FormControl, Select, InputLabel } from '@mui/material';
import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: rgba(4, 36, 106, 1);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;

// export const StyledFormControl = styled(FormControl)`
//   min-width: 240px;
//   margin-right: 16px;
//   background-color: ${({ theme }) => theme.palette.background.paper};
//   border-radius: ${({ theme }) => theme.shape.borderRadius};
//   box-shadow: ${({ theme }) => theme.shadows[1]};
// `;

// export const StyledSelect = styled(Select)`
//   background-color: white;
//   border-radius: ${({ theme }) => theme.shape.borderRadius};
//   border-color: ${({ theme }) => theme.palette.divider};
//   &:hover .MuiOutlinedInput-notchedOutline {
//     border-color: ${({ theme }) => theme.palette.primary.main};
//   }
//   .MuiSelect-select {
//     padding: 10px 14px;
//     font-size: 16px;
//   }
// `;

// export const StyledInputLabel = styled(InputLabel)`
//   font-weight: bold;
//   color: ${({ theme }) => theme.palette.text.primary};
// `;