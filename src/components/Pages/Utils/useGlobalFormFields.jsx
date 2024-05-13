import { useState, useEffect } from "react";

const UseGlobalFormFields = (initialState) => {
  const SIX_HOURS_IN_MS = 3 * 60 * 60 * 1000; 

  const [formFields, setFormFields] = useState(() => {
    const storedFields = localStorage?.getItem("formFields");
    const storedTimestamp = localStorage?.getItem("formFieldsTimestamp");
    const currentTime = new Date().getTime();

    if (storedFields && storedTimestamp) {
      if (currentTime - parseInt(storedTimestamp, 10) < SIX_HOURS_IN_MS) {
        return JSON.parse(storedFields);
      } else {
        localStorage?.removeItem("formFields");
        localStorage?.removeItem("formFieldsTimestamp");
      }
    }

    return initialState;
  });

  useEffect(() => {
    localStorage?.setItem("formFields", JSON.stringify(formFields));
    localStorage?.setItem("formFieldsTimestamp", new Date().getTime()?.toString());
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
};

export default UseGlobalFormFields;
