import { createContext,useEffect,useState } from "react"; 

// Create Context
export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const url = "http://localhost:5000"; // Backend API URL

    const [user, setUser] = useState(null); // Store logged-in user data
    const [formData, setFormData] = useState({
        user: { firstName: "", lastName: "", email: "", phone: "", password: "" },
        pet: { name: "", type: "", breed: "", age: "", gender: "", birthdate: "", medicalConditions: "", image: null }
    });

    // Function to update user details after login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
    };

    // Function to logout user
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const contextValue = {
        url,
        user,
        login,
        logout,
        formData,
        setFormData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};
