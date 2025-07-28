import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='main'>
      
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            {/* Add a catch-all route for client-side routing */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
     
    </div>
  );
};

export default App;