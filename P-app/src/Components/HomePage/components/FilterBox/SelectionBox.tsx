import { Box, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { CustomSelect } from "./utils/CustomSelect";

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
  };

  return (
    <MainContainer xs={4} item>
      <Typography
        sx={{
          color: "darkblue",
          fontWeight: "600",
          fontSize: {
            xs: "8px",
            sm: "12px",
            md: "16px",
            lg: "20px",
            xl: "28px",
          },
        }}
      >
        {label}
      </Typography>
      <Box sx={{ width: "70%" }}>
        <CustomSelect value={value} onChange={handleChange} />
      </Box>
    </MainContainer>
  );
};

export default SelectionBox;
