import { useState, useEffect } from "react";

const useGlobalFormFields = (initialState) => {
  const [formFields, setFormFields] = useState(() => {
    const storedFields = localStorage.getItem("formFields");
    return storedFields ? JSON.parse(storedFields) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(formFields));
  }, [formFields]);

  function handleFieldChange(fieldName, value) {
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  }

  return {
    formFields,
    handleFieldChange,
  };
}

export default useGlobalFormFields;