import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RootState, AppDispatch } from '../features/store';  // Import AppDispatch type
import { loadProjects } from '../features/projectSlice';  // Adjust the path based on your project structure

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  // Use the typed dispatch
  const dispatch: AppDispatch = useDispatch();

  // Fetch the projects from the Redux store
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(loadProjects());  // Dispatch the thunk correctly
    }
  }, [dispatch, projects.length]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {isLoading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : (
          projects.map((project) => (
            <MenuItem key={project.id} onClick={handleClose}>
              {project.name}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
