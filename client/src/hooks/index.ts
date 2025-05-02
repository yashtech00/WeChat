import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authUser, setAuthUser] = useState();
  const [loading, setLoading] = useState(true);

  const Backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${Backend_url}/user/me`, {
          withCredentials: true,
        });
        console.log(res, " user info");

        setAuthUser(res.data.data);
      } catch (e: any) {
        console.error("Error", e.message);

        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { authUser, loading, setAuthUser };
};
