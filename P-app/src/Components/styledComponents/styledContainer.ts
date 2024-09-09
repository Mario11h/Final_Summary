import styled from '@emotion/styled';
import { Box, Grid, Divider } from '@mui/material';

// General styling for container boxes
export const StyledBox = styled(Box)({
  position: 'relative',
  padding:'5px',
  border: '1px solid #e0e0e0',
  backgroundColor:'white',
  marginBottom:'15px',
  boxShadow: '0 4px 8px rgba(226, 1, 1, 0.3)',
});

export const StyledGridItem = styled(Grid)({
  position: 'relative',
});

export const StyledVerticalDivider = styled(Divider)({
  position: 'absolute',
  top: '16px',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
});

export const StyledEqualContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'space-between',
  width: '100%',
});

export const StyledTeamBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const StyledSectionBox = styled(Box)({
  flex: '1 1 45%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
});

export const StyledTitleContainer = styled(Box)({
  flexGrow: 1,
  textAlign: 'center',
});

export const StyledMilestoneContainer = styled(Box)({
  padding: '16px',
  width: '92%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 4px 8px rgba(226, 1, 1, 0.3)',
});

// Utility functions for budget value box
const getBackgroundColor = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  if (isActual) {
    return budget_actual_usd > budget_planned_usd ? 'rgba(226, 1, 1, 1)' : 'rgba(4, 164, 132, 1)';
  }
  return 'rgba(7, 62, 187, 1)';
};

const getWidth = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  const BASE_BUDGET = 150000;
  const BASE_WIDTH = 75;
  const WIDTH_INCREMENT = 40;

  const difference = isActual ? budget_actual_usd - BASE_BUDGET : budget_planned_usd - BASE_BUDGET;
  const increments = Math.floor(difference / 75000);
  const newWidth = BASE_WIDTH + increments * WIDTH_INCREMENT;

  return `${newWidth}px`;
};

// Styled component for budget value box
export const BudgetValueBox = styled(Box)<{ isActual: boolean; budget_actual_usd: number; budget_planned_usd: number }>(
  ({ isActual, budget_actual_usd, budget_planned_usd }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    margin: '4px 0',
    fontSize: '12px',
    fontFamily: 'roboto',
    fontWeight: 'bold',
    width: getWidth(isActual, budget_actual_usd, budget_planned_usd),
    color: 'white',
    backgroundColor: getBackgroundColor(isActual, budget_actual_usd, budget_planned_usd),
    textAlign: 'center',
  })
);

export const ActualBudgetValueBox = styled(BudgetValueBox)({
  marginLeft: '24px',
  color: 'white',
});

export const PlannedBudgetValueBox = styled(BudgetValueBox)({
  marginLeft: '15px',
});

// Additional container components
export const BudgetRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  gap: '8px',
});

export const BudgetContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const PaginationContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '95%',
  paddingBottom: '0px',
   padding: '5px',
  position: 'fixed',
  bottom: 0,
  transition: 'background-color 0.3s ease',
  backgroundColor: 'rgba(226, 234, 250, 1)',
});

export const PageNumbers = styled('div')({
  flex: 1,
  textAlign: 'center',
  fontSize: '16px',
});

export const StyledProjectHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
   
});

export const ProjectName = styled(Box)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

export const ProjectCode = styled(Box)({
  fontSize: '1.2rem',
  color: 'gray',
});

export const OngoingText = styled(Box)({
  fontSize: '1rem',
  color: 'rgba(4, 36, 106, 1)',
});
