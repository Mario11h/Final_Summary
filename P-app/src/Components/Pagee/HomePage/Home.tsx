import React from "react";
import {
  HomeHeroSection,
  HomeHeroSectionTextBox,
  HomeMiddleBox,
  HomeMiddleBoxImages,
  HomeMiddleSection,
  HomeStatsSection,
  PageContainer,
  StatContainer,
  StatBoxWrapper,
  StatBoxContent,
  StatBoxNumber,
  iconStyles,
  StatBoxContentMid,
} from "./HomeStyles";
import { Typography } from "@mui/material";

import HomeSearchBox from "./SearchBox/HomeSearchBox";

import ImageBoxWithAnimation from "./ImageBox/ImageBoxWithAnimation";
import { images } from "../../Assets/DummyData";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import Footer from "../Footer/Footer";

const HERO_TITLE = "Buy CMA CGM Containers";
const HERO_TEXT =
  "Building a container house. Selling goods in a container kiosk. Shipping aboard. Whatever your container need are, we've got you covered";
const MIDDLES_TEXT_FIELDS = [
  "Container Sales Platform or CSP is an online e-commerce platform that allows CMA CGM customers to purchase containers that are older than 13 years online.",
  "Since 2015 sales of containers were exploded. Agility play proposed to sell more containers to avoid additional logistic cost for Empty repositioning.",
  "Container sales should be provided effectively and with direct collaboration between CMA CGM and final client.",
];

const Home: React.FC = () => {
  return (
    <>
      <PageContainer container>
        <HomeHeroSection item xs={12}>
          <HomeHeroSectionTextBox>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              {HERO_TITLE}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {HERO_TEXT}
            </Typography>
          </HomeHeroSectionTextBox>
        </HomeHeroSection>
        <HomeMiddleSection container xs={12}>
          <HomeMiddleBox container xs={7}>
            <HomeSearchBox />
            <HomeMiddleBoxImages xs={12}>
              <ImageBoxWithAnimation
                delay={0}
                text={MIDDLES_TEXT_FIELDS[0]}
                imgurl={images[1].imageUrl}
              />
              <ImageBoxWithAnimation
                delay={300}
                text={MIDDLES_TEXT_FIELDS[1]}
                imgurl={images[2].imageUrl}
              />
              <ImageBoxWithAnimation
                delay={600}
                text={MIDDLES_TEXT_FIELDS[2]}
                imgurl={images[3].imageUrl}
              />
            </HomeMiddleBoxImages>
          </HomeMiddleBox>
        </HomeMiddleSection>
        <HomeStatsSection xs={12} container>
          <StatContainer xs={7} container>
            <StatBoxWrapper xs={4} item>
              <StatBoxContent>
                <StatBoxNumber>
                  <AllInboxIcon style={iconStyles} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    7
                  </Typography>
                </StatBoxNumber>
                <Typography sx={{ fontWeight: "600" }}>
                  Sold Containers
                </Typography>
              </StatBoxContent>
            </StatBoxWrapper>
            <StatBoxWrapper xs={4} item>
              <StatBoxContentMid>
                <StatBoxNumber>
                  <PublicIcon style={iconStyles} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    15
                  </Typography>
                </StatBoxNumber>
                <Typography sx={{ fontWeight: "600" }}>
                  Covered Countries
                </Typography>
              </StatBoxContentMid>
            </StatBoxWrapper>
            <StatBoxWrapper xs={4} item>
              <StatBoxContent>
                <StatBoxNumber>
                  <GroupsIcon style={iconStyles} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    313
                  </Typography>
                </StatBoxNumber>
                <Typography sx={{ fontWeight: "600" }}>
                  Active Customers
                </Typography>
              </StatBoxContent>
            </StatBoxWrapper>
          </StatContainer>
        </HomeStatsSection>
        <Footer/>
      </PageContainer>
    </>
  );
};

export default Home;
