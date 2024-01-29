import { useState, useEffect } from 'react';

export const useReload = (reloadDelay = 2500) => {
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(true);

  useEffect(() => {
    if (reloading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setReloading(false);
      }, reloadDelay);
    }
  }, [reloading, reloadDelay]);

  const reloadPage = () => setReloading(true);

  return { loading, reloadPage };
};
