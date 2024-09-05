import {
    Box,
    FormControl,
    Grid,
    MenuItem,
    Select,
    styled,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  interface SelectionBoxProps {
    label: string;
    value: string;
    changeValue: React.Dispatch<React.SetStateAction<string>>;
  }
  const MainContainer = styled(Grid)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });
  
  const SelectionBox: React.FC<SelectionBoxProps> = ({
    label,
    value,
    changeValue,
  }) => {
    const handleChange = (event: any) => {
      changeValue(event.target.value as string);
      console.log("hi");
    };
    return (
      <MainContainer xs={4} item>
        <Typography sx={{ color: "darkblue", fontWeight: "600" }}>
          {label}
        </Typography>
        <Box sx={{ width: "70%" }}>
          <FormControl fullWidth size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onSelect={handleChange}
            >
              <MenuItem value={value}>All</MenuItem>
              <MenuItem value={value}>1</MenuItem>
              <MenuItem value={value}>15</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </MainContainer>
    );
  };
  
  export default SelectionBox;
  