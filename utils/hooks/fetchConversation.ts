import { useEffect, useState } from "react";
import { fetchGroupByIdGuard } from "../services/groupService";
import { useRouter } from "next/router";
import { getConversationById } from "../services/conversationService";
import { fetchConversationByIdThunk } from "../../store/conversations/thunkConversation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export function useConversationGuard() {
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const router = useRouter();
  const { conversationId } = router.query;
  useEffect(() => {
    if (router.isReady) {
      fetchGroupByIdGuard(Number(conversationId))
        .then((res) => setLoading(true))
        .catch((err) => {
          setLoading(false);
          router.push("/conversation");
        });
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { loading };
}
