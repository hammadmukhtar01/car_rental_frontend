import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReloadingComponent from './reloadingComponent';

const GlobalLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        document.body.classList.add('loadings')
        const timer = setTimeout(() => {
            setIsLoading(false); 
            document.body.classList.remove('loadings')
        }, 300);

        return () => {
          clearTimeout(timer);
          document.body.classList.remove('loadings')
        }; 
    }, [location.pathname]); 

    if (isLoading) {
        return <ReloadingComponent />;
    }

    return <>{children}</>; 
};

export default GlobalLoader;
