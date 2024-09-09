import styled from "@emotion/styled";
import { Select, MenuItem } from "@mui/material";

export const StyledSelect = styled(Select)({
  backgroundColor: "white",
  borderRadius: "4px",

  ".MuiSelect-select": {
    padding: "10px 14px",
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#ccc",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#888",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#555",
  },
});

export const StyledMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: "#f0f0f0",
  },

  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});
