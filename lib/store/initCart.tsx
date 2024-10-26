"use client";
import { useEffect, useRef } from "react";
import { useCartStore } from "./cart";
import { Tables } from "../types/database.types";

export default function InitCart({ event }: { event: Tables<"events"> }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useCartStore.setState({
        event_id: event.id,
        event_title: event.title,
      });
    }
    initState.current = true;
  }, []);

  return <></>;
}
