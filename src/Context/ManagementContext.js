import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../Services/Api";
export const ManagementContext = createContext();
export const ManagementProvider = ({ children }) => {
  const [management, setManagement] = useState([]);

  const updateManagement = (newManagement) => {
    setManagement(newManagement);
  };

  useEffect(()=>{
    getData();
  },[])
  async function getData() {
    try {
        const response = await AuthService.AuthRole();
        console.log("response",response);
        setManagement(response.content);
    } catch (error) {
        console.error(error);
    }
}

  return (
    <ManagementContext.Provider value={{ management, updateManagement }}>
      {children}
    </ManagementContext.Provider>
  );
};
