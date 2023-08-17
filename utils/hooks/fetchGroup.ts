import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuthUser } from "../services/authService";
import { fetchGroupByIdGuard } from "../services/groupService";
import { useRouter } from "next/router";

export function useGroupGuard() {
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const router = useRouter();
  const { groupId } = router.query;
  useEffect(() => {
    fetchGroupByIdGuard(Number(groupId))
      .then((res) => setLoading(true))
      .catch((err) => {
        setLoading(false);
        router.push("/group");
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { loading };
}
