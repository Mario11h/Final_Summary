import styled from '@emotion/styled';
import {  Box, Grid, Divider } from '@mui/material';



export const StyledBox = styled(Box)`
  padding: 16px;
  position: relative;
  margin-bottom: 20px;
  max-width: 100%;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 8px; /* Rounded corners */
  border: 1px solid #e0e0e0; /* Light border for definition */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  

 
`;

export const StyledGridItem = styled(Grid)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const StyledContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-right: 24px;
  padding-left: 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledVerticalDivider = styled(Divider)`
  && {
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const StyledEqualContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;

// export const Styke = styled(Box)`
//   flex-grow: 1;
//   min-height: 400px;
//   display: flex;
//   flex-direction: column;
// `;

export const StyledMainBox = styled(Box)`
  flex-grow: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  
`;

export const StyledContainerBox = styled(Box)`
  display: flex;
  width: 100%;
  min-height: 600px;
`;

export const StyledMainGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: 400px;
`;

export const StyledMilestonesGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: 400px;
`;

export const StyledOverviewBox = styled(Box)`
  display: flex;
  align-items: right;
`;

export const StyledTextBox = styled(Box)`
  margin-left: 25px;
  min-width: 100px;
  flex-grow: 1;
`;

export const StyledTeamBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StyledSectionBox = styled(Box)`
  flex: 1 1 45%;
  min-width: 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 8px; /* Rounded corners */
  border: 1px solid #e0e0e0; /* Light border for definition */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
 
  

`;

export const StyledTitleContainer = styled(Box)`
  flex-grow: 1;
  text-align: center;
`;

export const StyledMilestoneContainer = styled(Box)`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 8px; /* Rounded corners */
  border: 1px solid #e0e0e0; /* Light border for definition */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const getBackgroundColor = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  if (isActual) {
    return budget_actual_usd > budget_planned_usd ? 'rgba(226, 1, 1, 1)' : 'rgba(4, 164, 132, 1)';
  }
  return 'rgba(7, 62, 187, 1)';
};

// Function to get width based on budget
const getWidth = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  const BASE_BUDGET = 80000;
  const BASE_WIDTH = 75;
  const WIDTH_INCREMENT = 20;

  const difference = isActual ? budget_actual_usd - BASE_BUDGET : budget_planned_usd - BASE_BUDGET;
  const increments = Math.floor(difference / 15000);
  const newWidth = BASE_WIDTH + increments * WIDTH_INCREMENT;

  return `${newWidth}px`;
};

// BudgetValueBox styled component
export const BudgetValueBox = styled(Box)<{ isActual: boolean; budget_actual_usd: number; budget_planned_usd: number }>`
  display: inline-block;
  padding: 4px 8px;
  margin: 4px 0;
  font-size: 12px;
  font-family: roboto;
  font-weight: bold;
  width: ${({ isActual, budget_actual_usd, budget_planned_usd }) => 
    getWidth(isActual, budget_actual_usd, budget_planned_usd)};
  color: white;
  background-color: ${({ isActual, budget_actual_usd, budget_planned_usd }) => 
    getBackgroundColor(isActual, budget_actual_usd, budget_planned_usd)};
  text-align: center; /* Center text horizontally */
  display: flex; /* Enable flexbox layout */
  align-items: center; /* Center text vertically */
  justify-content: center; /* Center text horizontally */
`;

// Specific styled components for Actual and Planned budgets
export const ActualBudgetValueBox = styled(BudgetValueBox)`
  margin-left: 24px;
`;

export const PlannedBudgetValueBox = styled(BudgetValueBox)`
  margin-left: 15px;
`;

export const BudgetRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`;

export const PageNumbers = styled.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
`;

export const StyledProjectHeaderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const ProjectName = styled(Box)`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ProjectCode = styled(Box)`
  font-size: 1.2rem;
  color: gray;
`;

export const OngoingText = styled(Box)`
  font-size: 1rem;
  color: rgba(4, 36, 106, 1);
`;