import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/projectSlice';
import { RootState, AppDispatch } from '../store/store';
import { StyledButton } from './styledComponents/styledButtons';
import {PaginationContainer, PageNumbers} from './styledComponents/styledContainer'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {CalibriBoldNavy14} from './styledComponents/styledText'

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.projects.currentPage);
  const totalProjects = useSelector((state: RootState) => state.projects.projects.length);
  
  const handleNextPage = () => {
    if (currentPage < totalProjects) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
        <ArrowLeftIcon />
      </StyledButton>
      <StyledButton onClick={handleNextPage} disabled={currentPage === totalProjects}>
        <ArrowRightIcon />
      </StyledButton>
      <PageNumbers>
        <CalibriBoldNavy14>{currentPage} of {totalProjects}</CalibriBoldNavy14>
        
      </PageNumbers>
      
    </PaginationContainer>
  );
};

export default Pagination;