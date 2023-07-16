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
