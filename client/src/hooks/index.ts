import axios from "axios";
import { useEffect, useState } from "react"


export const useAuth = () => {
    
    const [authUser, setAuthUser] = useState("");
    const [loading, setLoading] = useState(false);

    const Backend_url = import.meta.env.VITE_APP_BACKEND_URL;
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${Backend_url}/user/me`, { withCredentials: true });
                setAuthUser(res.data.data);
                setLoading(false)
            } catch (e:any) {
                console.error("Error", e.message);
                setLoading(true);
            }
        }
        fetch();    
    },[])
    
    
    return (
        {authUser,loading, setAuthUser}  
    )
}