import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import OcrServicePage from './OcrServicePage';
import InvoiceRegistrationPage from './InvoiceRegistrationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/extract-invoice-data" element={<OcrServicePage/>} />
        <Route path="/register-invoice" element={<InvoiceRegistrationPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
