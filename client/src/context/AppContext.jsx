import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

    const [token, useToken] = useState(null);   // for user auth
    const [blog, useBlog] = useState([]);   // to store all blogs data
    const [input, useInput] = useState(""); // to filter blogs

    const value = {axios, navigate, token, useToken, blog, useBlog, input, useInput};
    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}