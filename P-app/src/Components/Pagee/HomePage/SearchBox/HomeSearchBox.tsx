import { Grid } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { CustomSelect } from "./CustomSelect";
import {
  FilterBox,
  FilterBoxLabel,
  FilterButtonContainer,
  FilterButtonWrapper,
  FilterContainer,
  SearchContainersButton,
} from "./HomeSearchBoxStyles";

const MainContainer = styled(Grid)({
  height: "30%",
  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.75)",
});

const HomeSearchBox = () => {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [country, setCountry] = useState("All");

  return (
    <MainContainer xs={12} container>
      <FilterContainer xs={9} container>
        <FilterBox>
          <FilterBoxLabel>Category</FilterBoxLabel>
          <CustomSelect value={category} setValue={setCategory} />
        </FilterBox>
        <FilterBox>
          <FilterBoxLabel>Size</FilterBoxLabel>
          <CustomSelect value={size} setValue={setSize} />
        </FilterBox>
        <FilterBox>
          <FilterBoxLabel>Country</FilterBoxLabel>
          <CustomSelect value={country} setValue={setCountry} />
        </FilterBox>
      </FilterContainer>
      <FilterButtonContainer xs={3} container>
        <FilterButtonWrapper>
          <SearchContainersButton>Search Containers</SearchContainersButton>
        </FilterButtonWrapper>
      </FilterButtonContainer>
    </MainContainer>
  );
};

export default HomeSearchBox;
