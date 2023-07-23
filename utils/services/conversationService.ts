import { Conversation } from "../types/types";
import http from "./httpService";

export function getConversations() {
  return http.get<Conversation[]>("/conversation/conversations");
}

export function getConversationById(conversationId: number) {
  return http.get<Conversation>(`/conversation/${conversationId}`);
}
