import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuClasses } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { selectClasses, SelectChangeEvent } from "@mui/material/Select";

interface CustomSelectProps {
  value: string;
  setValue: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

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
            background: "F7F7F7",
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
      onChange={handleChange}
      sx={{
        border: "1px solid rgba(0,0,0,0.3)",
        height: "40px",
        paddingLeft: "10px",
        borderRadius: "5px",
        width: "100%",
        [`& .${selectClasses.select}`]: {
          background: "F7F7F7",
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
