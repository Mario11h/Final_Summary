import React from "react";
import { Box } from "@mui/material";
import {
  StyledSectionBox,
  StyledTeamBox,
  StyledTitleContainer,
} from "../styledComponents/styledContainer";
import { StyledTitle } from "../styledComponents/styledText";
import { StyledIconMulIcon } from "../styledComponents/StyledIconAvatar";

type LowerSectionProps<T> = {
  title: string;
  icon: React.ElementType;
  data: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  children?: React.ReactNode;
};

function LowerSection<T>({
  title,
  icon: Icon,
  data,
  renderItem,
  children,
}: LowerSectionProps<T>): JSX.Element {
  return (
    <StyledSectionBox>
      <StyledTeamBox>
        <StyledIconMulIcon>
          <Icon />
        </StyledIconMulIcon>
        <StyledTitleContainer>
          <StyledTitle>{title}</StyledTitle>
        </StyledTitleContainer>
      </StyledTeamBox>
      <Box mt={2}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>{renderItem(item, index)}</div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Box>
      <Box mt={2}>{children}</Box>
    </StyledSectionBox>
  );
}

export default LowerSection;
