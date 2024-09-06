import { Grid } from "@mui/material";
import { images } from "../../../Assets/DummyData";

import SelectionBox from "./SelectionBox";
import ImageBoxWithAnimation from "./ImageBoxWithAnimation";
import { useState } from "react";
import {
  FilterBoxFilters,
  FilterBoxFiltersMain,
  FilterBoxFiltersSearch,
  FilterBoxImageSection,
} from "../../HomePageStyles";
import { SearchContainersButton } from "../../HomePageStyles";

const FilterBox = () => {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [country, setCountry] = useState("All");
  return (
    <Grid container xs={7} sx={{ height: "50vh" }}>
      <FilterBoxFilters>
        <FilterBoxFiltersMain item xs={9}>
          <SelectionBox
            label="Category"
            value={category}
            changeValue={setCategory}
          />
          <SelectionBox label="Size" value={size} changeValue={setSize} />
          <SelectionBox
            label="Country"
            value={country}
            changeValue={setCountry}
          />
        </FilterBoxFiltersMain>
        <FilterBoxFiltersSearch item xs={3}>
          <SearchContainersButton>Search Containers</SearchContainersButton>
        </FilterBoxFiltersSearch>
      </FilterBoxFilters>
      <FilterBoxImageSection item>
        <ImageBoxWithAnimation
          delay={0}
          text="Container Sales Platform or CSP is an online e-commerce platform that
          allows CMA CGM customers to purchase containers that are older than 13
          years online."
          imgurl={images[3].imageUrl}
        />
        <ImageBoxWithAnimation
          delay={400}
          text="Since 2015 sales of containers were exploded. Agility play proposed to sell more containers to avoid additional logistic cost for Empty repositioning."
          imgurl={images[3].imageUrl}
        />
        <ImageBoxWithAnimation
          delay={800}
          text="Container sales should be provided effectively and with direct collaboration between CMA CGM and final client."
          imgurl={images[3].imageUrl}
        />
      </FilterBoxImageSection>
    </Grid>
  );
};

export default FilterBox;
