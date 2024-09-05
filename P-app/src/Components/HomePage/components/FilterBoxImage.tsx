import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface FilterBoxImageProps {
  src: string;
  alt: string;
}

const MainContainer = styled("div")({
  width: "100%",
  height: "50%",
  objectFit: "cover",
});

const FilterBoxImage: React.FC<FilterBoxImageProps> = ({ src, alt }) => {
  return (
    <MainContainer>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </MainContainer>
  );
};

export default FilterBoxImage;
