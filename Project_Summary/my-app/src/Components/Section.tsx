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
      {icon}
      <Box>
        <StyledTitleGreyBackground>{title}</StyledTitleGreyBackground>
        {content}
      </Box>
    </>
  );
};

export default Section;
