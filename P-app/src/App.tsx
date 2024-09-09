import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pagee/HomePage/Home'
import MainApp from './MainApp';   // Renamed from App.tsx to MainApp.tsx
import Navbar from './Components/Pagee/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default App;
