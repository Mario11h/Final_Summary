import React from 'react';
import {StyledContentBox } from './styledComponents/styledContainer';
import { StyledTitleGreyBackground } from './styledComponents/styledText';

type SectionProps = {
  icon: React.ReactElement;
  title: string;
  content: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ icon, title, content }) => {
  return (
    <>
      {icon}
      <StyledContentBox>
        <StyledTitleGreyBackground>{title}</StyledTitleGreyBackground>
        {content}
      </StyledContentBox>
    </>
  );
};

export default Section;
