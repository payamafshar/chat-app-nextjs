import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuthUser } from "../services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}
