import {
  MessageType,
  CreateMessageParams,
  FetchMessagePayload,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessageParams,
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
export function patchEditMessageApi(params: EditMessageParams) {
  return http.patch(
    `messages/${params.messageId}/conversation/${params.conversationId}`,
    { content: params.content }
  );
}
