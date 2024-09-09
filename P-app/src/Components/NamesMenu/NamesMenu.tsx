import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RootState, AppDispatch } from "../../store";
import { fetchProjects } from "../../features/projectSlice";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const dispatch: AppDispatch = useDispatch();
  const { projects, isLoading, error } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    if (projects.length === 0 && !isLoading) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length, isLoading]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectClick = (projectId: number) => {
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {isLoading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : error ? (
          <MenuItem disabled>Error: {error}</MenuItem>
        ) : (
          projects.map((project) => (
            <MenuItem
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
            >
              {project.name}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
