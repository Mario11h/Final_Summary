import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/Home";
import MainApp from "./Pages/MainApp"; // Renamed from App.tsx to MainApp.tsx
import Navbar from "./Components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default App;
