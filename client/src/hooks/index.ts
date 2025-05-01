import axios from "axios";
import { useEffect, useState } from "react"


export const useAuth = () => {
    
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const Backend_url = import.meta.env.VITE_APP_BACKEND_URL;
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${Backend_url}/user/me`, { withCredentials: true });
                setAuthUser(res.data.data);
                
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    setAuthUser(null); // 
                } else {
                    console.error("Error", e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        fetch();    
    },[])
    
    
    return (
        {authUser,loading, setAuthUser}  
    )
}