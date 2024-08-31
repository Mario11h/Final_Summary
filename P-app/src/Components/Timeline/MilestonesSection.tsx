import React from 'react';
import CustomizedTimeline from './Timeline'; // Adjust the import path as needed
import { MilestoneText } from '../styledComponents/styledText';
import {StyledMilestoneContainer} from '../styledComponents/styledContainer'
import { Milestone } from '../Validation/Type';

type MilestonesSectionProps = {
  milestones: Milestone[];
  startDate: string;
  endDate: string;
};

const MilestonesSection: React.FC<MilestonesSectionProps> = ({ milestones, startDate, endDate }) => {
  return (
    <StyledMilestoneContainer>
      <MilestoneText>Milestones</MilestoneText>
      <CustomizedTimeline
        startDate={startDate}
        endDate={endDate}
        milestones={milestones}
      />
    </StyledMilestoneContainer>
  );
};

export default MilestonesSection;
