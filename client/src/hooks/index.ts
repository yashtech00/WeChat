import axios from "axios";
import { useEffect, useState } from "react"


export const useAuth = () => {
    
    const [authUser, setAuthUser] = useState("");
    const [loading, setLoading] = useState(false);

    const Backend_url = import.meta.env.VITE_APP_BACKEND_URL;
    useEffect(() => {
        const fetch = async() => {
            const res = await axios.get(`${Backend_url}/`)
        }
        fetch();    
    },[])
    
    
    return (

    )
}