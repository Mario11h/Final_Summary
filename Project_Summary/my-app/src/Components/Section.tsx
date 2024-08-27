import React from 'react';
import { StyledTitleGreyBackground } from './styledComponents/styledText';
import { Box } from '@mui/material';

type SectionProps = {
  icon: React.ReactElement;
  title: string;
  content: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ icon, title, content }) => {
  return (
    <>
      <Box display="flex" alignItems="center" >
        <Box >{icon}</Box>
        <StyledTitleGreyBackground>{title}</StyledTitleGreyBackground>
      </Box>
      <Box marginRight={4}>
        {content}
      </Box>
    </>
  );
};

export default Section;
