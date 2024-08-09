import React, { createContext, useContext, useState } from "react";

const AuthModalContext = createContext(null);

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{ showLoginSignupModal, setShowLoginSignupModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
