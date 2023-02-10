import create from "solid-zustand";
import { User, UserState } from "../constants/interfaces";

export const userStore = create<UserState>((set) => ({
  user: null,
  logIn: (data: User) => set((state) => ({ ...state, user: data })),
  logOut: () => set((state) => ({ ...state, user: null })),
}));

