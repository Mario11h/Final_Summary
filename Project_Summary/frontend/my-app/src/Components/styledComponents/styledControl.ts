
import styled from 'styled-components';
import { Select, MenuItem } from '@mui/material';

export const StyledSelect = styled(Select)`
  background-color: white;
  border-radius: 4px;

  .MuiSelect-select {
    padding: 10px 14px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #888;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #555;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.Mui-selected {
    background-color: #f0f0f0;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;