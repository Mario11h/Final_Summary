import { styled } from '@mui/system';
import { Typography } from '@mui/material';
export const AbsoluteBox = styled('div')({
  position: 'absolute',
  left: 0,
  top: 10,
  width: '10%',
  height: '8vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const FlexBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
});

export const LogoutBox = styled('div')({
  position: 'absolute',
  top: 10,
  right: 10,
});

export const BackgroundBox = styled('div')({
  width: '100%',
  height: '50vh',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CenteredTypography = styled('div')({
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  textShadow: '0 4px 8px rgba(4, 36, 106, 1)',
});


export const StyledTitles = styled(Typography)({
  color: '#003366', 
  fontSize: '24px', 
  fontWeight: 'bold', 
  fontFamily: 'roboto',
  marginLeft:'10px'
});