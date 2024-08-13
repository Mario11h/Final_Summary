import React from 'react';
import CustomizedTimeline from './Timeline'; // Adjust the import path as needed
import { MilestoneText } from './styledComponents/styledText';
import {StyledMilestoneContainer} from './styledComponents/styledContainer'
type Milestone = {
  id: number;
  title: string;
  description: string;
  date: string;
  is_current_state: boolean;
};

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
