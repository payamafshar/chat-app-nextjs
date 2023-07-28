import {
  MessageType,
  CreateMessageParams,
  FetchMessagePayload,
} from "../types/types";
import http from "./httpService";

export function getMessagesFromConversation(conversationId: number) {
  return http.get<FetchMessagePayload>(`/messages/${conversationId}`);
}
export function createMessage(data: CreateMessageParams) {
  return http.post(`/messages/createMessage`, data);
}
