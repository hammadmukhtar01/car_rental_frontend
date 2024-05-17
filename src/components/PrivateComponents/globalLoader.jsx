import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReloadingComponent from './reloadingComponent';

const GlobalLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 100);

        return () => clearTimeout(timer); 
    }, [location.pathname]); 

    if (isLoading) {
        return <ReloadingComponent />;
    }

    return <>{children}</>; 
};

export default GlobalLoader;
