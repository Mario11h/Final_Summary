import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/Home";
import MainApp from "./Pages/MainApp"; // Renamed from App.tsx to MainApp.tsx
import Navbar from "./Components/Navbar/Navbar";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { closeAlert } from "./features/AlertSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state: RootState) => state.alert);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<MainApp />} />
      </Routes>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
