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

export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  // conversation: Conversation;
  // attachments?: MessageAttachment[];
};
