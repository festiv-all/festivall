"use client";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useUser } from "./user";

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = useRef(false);
  console.log("init user", user);
  console.log("init state", initState.current);

  useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user });
    }
    initState.current = true;
  }, []);

  return <></>;
}
