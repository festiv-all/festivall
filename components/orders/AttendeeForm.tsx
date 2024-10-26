"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCartStore from "@/lib/store/cart";
import useAttendeeStore from "@/lib/store/attendee";
import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/utils/supabase/client";
import { Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import InitAttendees from "@/lib/store/initAttendees";

export default function AttendeeForm() {
  const [copyInfo, setCopyInfo] = useState(false);
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const user = useUser((state) => state.user);
  const attendees = useAttendeeStore((state) => state.attendees);
  const addAttendee = useAttendeeStore((state) => state.addAttendee);
  const updateAttendee = useAttendeeStore((state) => state.updateAttendee);
  const addAttendeeName = useAttendeeStore((state) => state.addAttendeeName);
  const removeAttendeeName = useAttendeeStore(
    (state) => state.removeAttendeeName
  );
  const DEBOUNCE_TIME_MS = 300;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (copyInfo && e.target.form?.className.split(" ")[1] === "form-1") {
      addAttendeeName(e.target.value);
    } else {
      updateAttendee(e.target.form?.id || "", e.target.id, e.target.value);
    }
  };

  const handleCopyInfoChange = (checked: boolean) => {
    setCopyInfo(checked);
    if (checked) {
      addAttendeeName(attendees[0].name);
    } else {
      removeAttendeeName(attendees[0].product_id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {cart.map((ticket, index) => (
        <form
          id={ticket.product_id}
          onSubmit={handleSubmit}
          className={`space-y-4 form-${index + 1}`}
        >
          <AccordionItem value={`item-${index}`} key={ticket.product_id}>
            <AccordionTrigger className="text-pink-700 font-semibold">
              {ticket.product_title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2.5 text-xs p-0.5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={
                        attendees.find(
                          (a) => a.product_id === ticket.product_id
                        )?.name || ""
                      }
                      placeholder="Enter your name"
                      required
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      placeholder="example@email.com"
                      onChange={handleChange}
                      disabled={!!user?.email}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Verify your number on My page"
                      value={user?.phone}
                      onChange={handleChange}
                      disabled={true}
                      className="pl-10"
                    />
                  </div>
                </div>
                {index === 0 && cart.length > 1 && (
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="copy-info"
                      checked={copyInfo}
                      onCheckedChange={handleCopyInfoChange}
                    />
                    <label
                      htmlFor="copy-info"
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use this information for all attendees
                    </label>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <InitAttendees />
        </form>
      ))}
    </Accordion>
  );
}
