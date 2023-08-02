import {
  MessageType,
  CreateMessageParams,
  FetchMessagePayload,
  DeleteMessageParams,
  DeleteMessageResponse,
} from "../types/types";
import http from "./httpService";

export function getMessagesFromConversation(conversationId: number) {
  return http.get<FetchMessagePayload>(`/messages/${conversationId}`);
}
export function createMessage(data: CreateMessageParams) {
  return http.post(`/messages/createMessage`, data);
}

export function deleteMessageApi(params: DeleteMessageParams) {
  return http.delete<DeleteMessageResponse>(
    `messages/${params.messageId}/conversation/${params.conversationId}`
  );
}
