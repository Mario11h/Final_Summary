import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import { menuClasses } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { selectClasses, SelectChangeEvent } from "@mui/material/Select";

interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
      disableUnderline
      variant="standard"
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        sx: {
          marginBlock: "0.5rem",
          [`& .${menuClasses.paper}`]: {
            borderRadius: "12px",
          },
          [`& .${menuClasses.list}`]: {
            paddingTop: 0,
            paddingBottom: 0,
            background: "white",
            "& li": {
              paddingTop: "12px",
              paddingBottom: "12px",
            },
            "& li:hover": {
              background: "lightblue",
            },
            "& li.Mui-selected": {
              color: "white",
              background: "#003366",
            },
            "& li.Mui-selected:hover": {
              background: "#003366",
            },
          },
        },
      }}
      IconComponent={ExpandMoreIcon}
      value={value}
      onChange={onChange}
      sx={{
        width: "90%",
        [`& .${selectClasses.select}`]: {
          background: "white",
          color: "black",
        },
        [`& .${selectClasses.icon}`]: {
          right: "12px",
        },
        "&.Mui-focused .MuiSelect-select": {
          backgroundColor: "transparent",
        },
        "&.Mui-active .MuiSelect-select": {
          backgroundColor: "transparent",
        },
        "&:hover .MuiSelect-select": {
          backgroundColor: "transparent",
        },
      }}
    >
      <MenuItem value={"All"}>All</MenuItem>
      <MenuItem value={"1"}>1</MenuItem>
      <MenuItem value={"2"}>2</MenuItem>
    </Select>
  );
};
