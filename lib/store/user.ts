/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | undefined;
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      user: undefined,
    }),
    {
      name: "user-storage",
    }
  )
);
