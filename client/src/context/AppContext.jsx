import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);   // for user auth
    const [blogs, setBlogs] = useState([]);   // to store all blogs data
    const [input, setInput] = useState(""); // to filter blogs

    const fetchBlogs = async() => {
        try{
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchBlogs();
    }, [])

    const value = {axios, navigate, token, setToken, blogs, setBlogs, input, setInput};
    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}