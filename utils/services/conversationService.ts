import { Conversation } from "../types/types";
import http from "./httpService";

export function getConversations() {
  return http.get<Conversation[]>(
    "http://localhost:3001/api/conversation/conversations"
  );
}

export function getConversationById(conversationId: number) {
  return http.get<Conversation>(
    `http://localhost:3001/api/conversation/${conversationId}`
  );
}
