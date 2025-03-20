import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [url, setUrl] = useState("http://localhost:5000/api");
  const [users, setUsers] = useState([]); // Store multiple users

  const registerUser = (data) => {
    console.log("📥 Data Received in Context:", data);  // ✅ Debugging log
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, data];
      console.log("✅ Users after update:", updatedUsers); // ✅ Should now show updated data
      return updatedUsers;
    });

    setTimeout(() => {
      console.log("✅ Users array after update:", users); // ✅ Should show updated array
    }, 500); // Slight delay to allow React to update state
  };

  useEffect(() => {
    console.log("🔥 Updated Users in Context:", JSON.stringify(users, null, 2)); // ✅ Now should show updated users
  }, [users]);
  

  return (
    <StoreContext.Provider value={{ url, users, registerUser }}>
      {children}
    </StoreContext.Provider>
  );
};
