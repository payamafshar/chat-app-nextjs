import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { fetchGroupByIdGuard } from "../services/groupService";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchGroupByIdThunk } from "../../store/groups/thunkGroups";

export function useGroupGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const groupId = router.query.groupId;
  useEffect(() => {
    if (router.isReady) {
      fetchGroupByIdGuard(Number(groupId))
        .then((res) => setLoading(true))
        .catch((err) => {
          setLoading(false);
          router.push("/group");
        });
    }

    return () => {
      controller.abort();
    };
  }, [groupId]);

  return { loading };
}
