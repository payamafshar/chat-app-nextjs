import { MessageType } from "../types/types";
import http from "./httpService";

export function getMessagesFromConversation(conversationId: number) {
  return http.get<MessageType[]>(
    `http://localhost:3001/api/messages/${conversationId}`
  );
}
