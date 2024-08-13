import React from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DoneIcon from '@mui/icons-material/Done';
import {
  StyledTimeline,
  StyledTimelineItem,
  StyledTimelineSeparator,
  StyledTimelineConnector,
  StyledTimelineContent,
  StyledTimelineDot,
  StyledTimelineDotPerson,
  StyledTimelineDotDone,
  StyledDiv,
  StyledDivEnd,
  StyledArrowBackIcon,
  LeftDiv,
  RightDiv,
  ArrowContainer,
} from './styledComponents/StyledTimeline';
import { CalibriBoldNavy14, CalibriBoldNavy11, CalibriBoldNavy18 } from './styledComponents/styledText';
import { timelineItemClasses } from '@mui/lab/TimelineItem';

type Milestone = {
  id: number;
  title: string;
  description: string;
  date: string;
  currentFlag: boolean;
};

type CustomizedTimelineProps = {
  startDate: string;
  endDate: string;
  milestones: Milestone[];
};

const CustomizedTimeline: React.FC<CustomizedTimelineProps> = ({ startDate, endDate, milestones }) => {
  return (
    <StyledTimeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <StyledTimelineItem>
        <StyledTimelineSeparator>
          <StyledTimelineDotPerson>
            <DirectionsRunIcon  />
          </StyledTimelineDotPerson>
          <StyledTimelineConnector />
        </StyledTimelineSeparator>
        <StyledTimelineContent>
          <CalibriBoldNavy14>Project Start Date</CalibriBoldNavy14>
          <CalibriBoldNavy11>{startDate}</CalibriBoldNavy11>
        </StyledTimelineContent>
      </StyledTimelineItem>

      {milestones && milestones.length > 0 ? (
        milestones.map((milestone, index) => (
          <StyledTimelineItem key={milestone.id}>
            <StyledTimelineSeparator>
              <StyledTimelineConnector />
              <StyledTimelineDot>
                <CalibriBoldNavy18>{index + 1}</CalibriBoldNavy18>
              </StyledTimelineDot>
              <StyledTimelineConnector />
            </StyledTimelineSeparator>
            <StyledTimelineContent>
              <StyledDiv>
                <LeftDiv>
                  <CalibriBoldNavy14>{milestone.title}</CalibriBoldNavy14>
                  <CalibriBoldNavy11>{milestone.description}</CalibriBoldNavy11>
                </LeftDiv>
                <RightDiv>
                  <CalibriBoldNavy11>{milestone.date}</CalibriBoldNavy11>
                  {milestone.currentFlag ? (
                    <ArrowContainer>
                      <StyledArrowBackIcon />
                    </ArrowContainer>
                  ) : null}
                </RightDiv>
              </StyledDiv>
            </StyledTimelineContent>
          </StyledTimelineItem>
        ))
      ) : (
        <StyledTimelineItem>
          <StyledTimelineContent>
            <p>No milestones available</p>
          </StyledTimelineContent>
        </StyledTimelineItem>
      )}

      <StyledTimelineItem>
        <StyledTimelineSeparator>
          <StyledTimelineConnector />
          <StyledTimelineDotDone>
            <DoneIcon />
          </StyledTimelineDotDone>
        </StyledTimelineSeparator>
        <StyledTimelineContent>
          <StyledDivEnd>
            <CalibriBoldNavy14>Project End Date</CalibriBoldNavy14>
            <CalibriBoldNavy11>{endDate}</CalibriBoldNavy11>
          </StyledDivEnd>
        </StyledTimelineContent>
      </StyledTimelineItem>
    </StyledTimeline>
  );
};

export default CustomizedTimeline;