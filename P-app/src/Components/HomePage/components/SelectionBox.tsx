import { Padding } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  NativeSelect,
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
  };

  return (
    <MainContainer xs={4} item>
      <Typography sx={{ color: "#003366", fontWeight: "600" }}>
        {label}
      </Typography>
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <NativeSelect
            defaultValue="All"
            value={value}
            onChange={handleChange}
            sx={{
              "& select": {
                paddingLeft: "8px",
              },
            }}
          >
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </MainContainer>
  );
};

export default SelectionBox;
