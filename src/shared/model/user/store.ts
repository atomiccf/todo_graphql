import { User } from "shared/model/user/types";
import { create } from "zustand";


interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}




export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: false,
    error: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
   }));
