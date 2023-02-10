export interface User {
  name: string;
  id: number;
}

export interface UserState {
  user: User | null;
  logIn: (data: User) => void;
  logOut: () => void;
}

