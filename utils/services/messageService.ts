import { MessageType, CreateMessageParams } from "../types/types";
import http from "./httpService";

export function getMessagesFromConversation(conversationId: number) {
  return http.get<MessageType[]>(
    `http://localhost:3001/api/messages/${conversationId}`
  );
}
export function createMessage(data: CreateMessageParams) {
  return http.post<MessageType>(`/messages/createMessage`, data);
}
