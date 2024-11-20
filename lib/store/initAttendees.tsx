"use client";
import { useEffect, useRef } from "react";
import { useAttendeeStore } from "./attendee";
import useCartStore from "./cart";
import { useUser } from "./user";

export default function InitAttendees() {
  const initState = useRef(false);
  const user = useUser((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const attendees = useAttendeeStore((state) => state.attendees);

  useEffect(() => {
    if (!initState.current && attendees.length === 0) {
      useAttendeeStore.setState({
        attendees: cart.map((a) => ({
          product_id: a.product_id,
          event_id: a.event_id,
          name: "",
          email: user?.email ?? "",
          phone: user?.phone ?? "",
          city: "",
          note: "",
          price: 0,
        })),
      });
    }
    initState.current = true;
  }, [attendees]);

  return <></>;
}
