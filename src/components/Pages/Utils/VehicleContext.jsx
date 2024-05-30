// src/context/VehicleContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT'); 
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, loading }}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleContext;
