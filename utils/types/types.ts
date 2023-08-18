export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  // profile?: Profile;
  // presence?: UserPresence;
  // peer: UserPeer;
};

export type RegisterUserParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginUserParams = {
  username: string;
  password: string;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  username: string;
  message?: string;
};

export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
  // attachments?: MessageAttachment[];
};
export type FetchMessagePayload = {
  conversationId: number;
  messages: MessageType[];
};

export type MessageEventPayload = {
  conversation: Conversation;
  message: MessageType;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};

export type ConversationMessage = {
  conversationId: number;
  messages: MessageType[];
};

export type Points = {
  x: number;
  y: number;
};

export type DeleteMessageParams = {
  messageId: number;
  conversationId: number;
};
export type EditMessageParams = {
  messageId: number;
  conversationId: number;
  content?: string;
};

export type DeleteMessageResponse = {
  messageId: number;
  conversationId: number;
};

export type ConversationType = "group" | "private";

export type ConversationTypeData = {
  type: ConversationType;
  label: string;
};
export type GroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  group: Group;
  // attachments?: MessageAttachment[];
};

export type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: GroupMessageType[];
  createdAt: number;
  lastMessageSent: MessageType;
  lastMessageSentAt: Date;
  avatar?: string;
};

export type CreateGroupParams = {
  title: string;
  users: string[];
};

export type GroupMessage = {
  groupId: number;
  messages: GroupMessageType[];
};

export type GroupMessageEventPayload = {
  group: Group;
  message: GroupMessageType;
};

export type CreateGroupMessageParams = {
  groupId: number;
  content: string;
};

export type DeleteGroupMessageParams = {
  groupId: number;
  messageId: number;
};

export type DeleteGroupMessageEventPayload = {
  userId: number;
  groupId: number;
  messageId: number;
};

export type EditGroupMessageParams = {
  groupId: number;
  messageId: number;
  content?: string;
};

export type onlineGroupUsersPayload = {
  onlineUsers: User[];
  offlineUsers: User[];
};

export type AddUserToGroupParams = {
  groupId: number;
  username: string;
};

export type AddUserToGroupResponse = {
  recipientId: number;
  group: Group;
};
export type DeleteUserFromGroupResponse = {
  recipientId: number;
  group: Group;
};

export type DeleteUserFromGroupParams = {
  recipientId: number;
  groupId: number;
};

export enum UpdateGroupAction {
  NEW_MESSAGE = "newMessage",
}

export type UpdateGroupPayload = {
  type?: UpdateGroupAction;
  group: Group;
};

export type TransferAdminParams = {
  username: string;
  groupId: number;
};
