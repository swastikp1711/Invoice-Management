import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 
        className="text-xl font-bold text-blue-500 cursor-pointer hover:underline"
        onClick={() => navigate('/register-invoice')}
      >
        Register New Invoice
      </h1>
      <h1 
        className="text-xl font-bold text-blue-500 cursor-pointer hover:underline"
        onClick={() => navigate('/extract-invoice-data')}
      >
        Extract Data from Invoice
      </h1>
    </div>
  );
};

export default HomePage;
