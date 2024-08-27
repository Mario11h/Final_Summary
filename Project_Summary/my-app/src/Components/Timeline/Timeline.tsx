import React from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DoneIcon from '@mui/icons-material/Done';
import { TimelineItem, TimelineSeparator, TimelineContent, timelineItemClasses } from '@mui/lab';
import {
  StyledTimeline,
  StyledTimelineConnector,
  StyledTimelineDot,
  StyledTimelineDotPerson,
  StyledTimelineDotDone,
  StyledDiv,
  StyledDivEnd,
  StyledArrowBackIcon,
  ArrowContainer,
} from '../styledComponents/StyledTimeline';
import { CalibriBoldNavy14, CalibriBoldNavy11, CalibriBoldNavy18, CalibriBoldRed11 } from '../styledComponents/styledText';
import { Grid } from '@mui/material';
import { Milestone } from '../Validation/Type';

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
      <TimelineItem>
        <TimelineSeparator>
          <StyledTimelineDotPerson>
            <DirectionsRunIcon />
          </StyledTimelineDotPerson>
          <StyledTimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <CalibriBoldNavy14>Project Start Date</CalibriBoldNavy14>
          <CalibriBoldRed11>{startDate}</CalibriBoldRed11>
        </TimelineContent>
      </TimelineItem>

      {milestones && milestones.length > 0 ? (
        milestones.map((milestone, index) => (
          <TimelineItem key={milestone.id}>
            <TimelineSeparator>
              <StyledTimelineConnector />
              <StyledTimelineDot>
                <CalibriBoldNavy18>{index + 1}</CalibriBoldNavy18>
              </StyledTimelineDot>
              <StyledTimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <StyledDiv>
                <Grid>
                  <CalibriBoldNavy14>{milestone.title}</CalibriBoldNavy14>
                  <CalibriBoldNavy11>{milestone.description}</CalibriBoldNavy11>
                </Grid>
                <Grid>
                <CalibriBoldRed11>{milestone.date.toString()}</CalibriBoldRed11>
                  {milestone.currentFlag ? (
                    <ArrowContainer>
                      <StyledArrowBackIcon />
                    </ArrowContainer>
                  ) : null}
                </Grid>
              </StyledDiv>
            </TimelineContent>
          </TimelineItem>
        ))
      ) : (
        <TimelineItem>
          <TimelineContent>
            <p>No milestones available</p>
          </TimelineContent>
        </TimelineItem>
      )}

      <TimelineItem>
        <TimelineSeparator>
          <StyledTimelineConnector />
          <StyledTimelineDotDone>
            <DoneIcon />
          </StyledTimelineDotDone>
        </TimelineSeparator>
        <TimelineContent>
          <StyledDivEnd>
            <CalibriBoldNavy14>Project End Date</CalibriBoldNavy14>
            <CalibriBoldRed11>{endDate}</CalibriBoldRed11>
          </StyledDivEnd>
        </TimelineContent>
      </TimelineItem>
    </StyledTimeline>
  );
};

export default CustomizedTimeline;
