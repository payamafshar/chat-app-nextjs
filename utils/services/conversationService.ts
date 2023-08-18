import { Conversation, CreateConversationParams } from "../types/types";
import http from "./httpService";

export function getConversations() {
  return http.get<Conversation[]>("/conversation/conversations");
}

export function getConversationByIdGuard(conversationId: number) {
  return http.get<Conversation>(`/conversation/find/${conversationId}`);
}
export function postCreateConversation(data: CreateConversationParams) {
  return http.post("/conversation/createConversation", data);
}
