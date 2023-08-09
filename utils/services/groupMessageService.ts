import {
  CreateGroupMessageParams,
  GroupMessage,
  GroupMessageEventPayload,
} from "../types/types";
import http from "./httpService";

export function getAllGroupMessages(groupId: number) {
  return http.get<GroupMessage>(`groupMessage/${groupId}/allGroupMessages`);
}

// export function postCreateGroupMessage(data: CreateGroupMessageParams) {
//   return http.post<GroupMessageEventPayload>(
//     `groupMessage/${data.groupId}/create`
//   );
// }
