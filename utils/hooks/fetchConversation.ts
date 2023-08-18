import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getConversationByIdGuard } from "../services/conversationService";

export function useConversationGuard() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const conversationId = router.query.conversationId;
  useEffect(() => {
    if (router.isReady) {
      getConversationByIdGuard(Number(conversationId))
        .then((res) => setLoading(true))
        .catch((err) => {
          setLoading(false);
          router.push("/conversation");
        });
    }

    return () => {
      controller.abort();
    };
  }, [conversationId]);

  return { loading };
}
