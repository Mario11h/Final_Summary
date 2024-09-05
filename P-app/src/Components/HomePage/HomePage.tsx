import React,{ useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { images } from '../Assets/DummyData';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import { StyledIcon, TextCont, ContentFlex, NumberFetch,Flextxt, FilterBox, FilterBoxFilters, FilterBoxFiltersMain, FilterBoxFiltersSearch, SearchContainersButton } from './HomePageStyles';
import  SelectionBox from './components/SelectionBox';
import {
  AbsoluteBox,
  FlexBox,
  LogoutBox,
  BackgroundBox,
  CenteredTypography,
  StyledTitles
  
} from './HomePageStyles';
import { StyledBox } from '../styledComponents/styledContainer';
import { color } from 'html2canvas/dist/types/css/types/color';

const HomePage: React.FC = () => {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [country, setCountry] = useState("All");
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <AbsoluteBox style={{ backgroundImage: `url(${images[0].imageUrl})` }} />

          <FlexBox>
            <Button sx={{ color: 'blue', textTransform: 'none' }}>Home</Button>
            <Button sx={{ color: 'blue', textTransform: 'none' }}>Products</Button>
          </FlexBox>

          <LogoutBox>
            <Button>
              <LogoutIcon sx={{ color: 'black', mt: 2 }} />
            </Button>
          </LogoutBox>
        </Grid>

        <Grid item xs={12}>
          <BackgroundBox style={{ backgroundImage: `url(${images[1].imageUrl})` , height:"60vh"}}>
            <CenteredTypography>
              <Typography variant="h4">
                Buy CMA CGM Containers<br />
                Building a container house. Selling goods in a container kiosk. Shipping aboard. <br />
                Whatever your container need are, we've got you covered
              </Typography>
            </CenteredTypography>
          </BackgroundBox>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sx={{
            height: "60vh",
            transform: "translateY(-50px)",
            justifyContent: "center",
          }}
        >
          <FilterBox item xs={7}>
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
                <SearchContainersButton>
                  Search Containers
                </SearchContainersButton>
              </FilterBoxFiltersSearch>
            </FilterBoxFilters>
            <Grid
              item
              sx={{
                width: "100%",
                height: "65%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={3.7}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={images[1].imageUrl}
                  alt="image1"
                  sx={{
                    width: "100%",
                    height: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ padding: "4px", boxSizing: "border-box" }}>
                  <Typography sx={{ fontSize: "12px" }}>
                    Container Sales Platform or CSP is an online e-commerce
                    platform that allows CMA CGM customers to purchase
                    containers that are older than 13 years online
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={3.7}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={images[2].imageUrl}
                  alt="image1"
                  sx={{
                    width: "100%",
                    height: "50%",
                  }}
                />
                <Box sx={{ padding: "4px", boxSizing: "border-box" }}>
                  <Typography sx={{ fontSize: "12px" }}>
                    Container Sales Platform or CSP is an online e-commerce
                    platform that allows CMA CGM customers to purchase
                    containers that are older than 13 years online
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={3.7}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  borderRadius: "10px",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={images[3].imageUrl}
                  alt="image1"
                  sx={{
                    width: "100%",
                    height: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ padding: "4px", boxSizing: "border-box" }}>
                  <Typography sx={{ fontSize: "12px" }}>
                    Container Sales Platform or CSP is an online e-commerce
                    platform that allows CMA CGM customers to purchase
                    containers that are older than 13 years online
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </FilterBox>
        </Grid>

        <Grid item xs={12} >
          <BackgroundBox style={{ backgroundImage: `url(${images[2].imageUrl})` }}></BackgroundBox>
          <StyledBox
            sx={{
              backgroundColor: 'white',
              boxShadow: 'revert',
              borderRadius: 2,
              maxWidth: 800,
              margin: '0 auto',
              transform: 'translateY(-300px)',
            }}
          >
            <Grid container >
              <Grid item xs={4}>
                <Box sx={{ padding: 8, textAlign: 'center' }}>
                  <ContentFlex>
                    <StyledIcon><AllInboxIcon /></StyledIcon>
                    <NumberFetch>7</NumberFetch>
                  </ContentFlex>
                  <TextCont>Sold Containers</TextCont>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ padding: 8, textAlign: 'center', borderRight: '2px dashed', borderLeft: '2px dashed' }}>
                  <ContentFlex>
                    <StyledIcon><PublicIcon /></StyledIcon>
                    <NumberFetch>15</NumberFetch>
                  </ContentFlex>
                  <TextCont>Covered Countries</TextCont>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ padding: 8, textAlign: 'center' }}>
                  <ContentFlex>
                    <StyledIcon><GroupsIcon /></StyledIcon>
                    <NumberFetch>313</NumberFetch>
                  </ContentFlex>
                  <TextCont>Active Customers</TextCont>
                </Box>
              </Grid>
            </Grid>
          </StyledBox>
        </Grid>
        <Grid item xs={12}>
        <Flextxt>
            <Button sx={{color:'red'}}>Terms and conditions</Button>
            <Button sx={{color:'red'}}>Privacy Notice</Button>
            <Button sx={{color:'red'}}>Legal Terms</Button>
          </Flextxt>

        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;