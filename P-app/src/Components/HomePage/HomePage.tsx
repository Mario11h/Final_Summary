import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { images } from '../Assets/DummyData';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import {
  AbsoluteBox,
  FlexBox,
  LogoutBox,
  BackgroundBox,
  CenteredTypography,
  StyledTitles
} from './HomePageStyles';
import { StyledBox } from '../styledComponents/styledContainer';

const HomePage: React.FC = () => {
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
          <BackgroundBox style={{ backgroundImage: `url(${images[1].imageUrl})` }}>
            <CenteredTypography>
              <Typography variant="h4">
                Buy CMA CGM Containers<br />
                Building a container house. Selling goods in a container kiosk. Shipping aboard. <br />
                Whatever your container need are, we've got you covered
              </Typography>
            </CenteredTypography>
          </BackgroundBox>
        </Grid>

        <Grid item container xs={12} sx={{ height: '40vh', backgroundColor : 'red', transform: 'translateY(-80px)', justifyContent: 'center' }}>
          <Grid item xs={6} sx={{ backgroundColor: 'white', height: '30vh', boxShadow: '0 4px 8px rgba(4, 36, 106, 1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '350px' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <StyledTitles variant="h6">Category</StyledTitles>
              <StyledTitles variant="h6">Size</StyledTitles>
              <StyledTitles variant="h6">Country</StyledTitles>
            </Grid>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <StyledTitles variant="h6">New Title 1</StyledTitles>
              <StyledTitles variant="h6">New Title 2</StyledTitles>
              <StyledTitles variant="h6">New Title 3</StyledTitles>
              <StyledTitles variant="h6">New Title 4</StyledTitles>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
        <BackgroundBox style={{ backgroundImage: `url(${images[2].imageUrl})` }}></BackgroundBox>
        <StyledBox
      sx={{
        backgroundColor: 'white',
        boxShadow:'revert',
        borderRadius: 2,
        maxWidth: 800,
        margin: '0 auto',
        transform: 'translateY(-300px)',
      }}
    >
      <Grid container >
        <Grid item xs={4}>
          <Box sx={{ padding: 8, textAlign: 'center' }}>
          <AllInboxIcon/><Typography>Item 1</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ padding: 8, textAlign: 'center' }}>
          <PublicIcon/><Typography>Item 2</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ padding: 8, textAlign: 'center' }}>
          <GroupsIcon/><Typography>Item 3</Typography>
          </Box>
        </Grid>
      </Grid>
    </StyledBox>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;