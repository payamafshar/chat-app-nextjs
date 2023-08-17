import { useEffect, useState } from "react";
import { fetchGroupByIdGuard } from "../services/groupService";
import { useRouter } from "next/router";
import { getConversationById } from "../services/conversationService";

export function useConversationGuard() {
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const router = useRouter();
  const { conversationId } = router.query;
  useEffect(() => {
    getConversationById(Number(conversationId))
      .then((res) => setLoading(true))
      .catch((err) => {
        setLoading(false);
        router.push("/conversation");
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { loading };
}
