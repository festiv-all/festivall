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
import useAttendeeStore from "@/lib/store/attendee";
import useCartStore from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { Mail, MapPin, Notebook, Phone, User } from "lucide-react";
import { useState } from "react";

export default function AttendeeForm() {
  const [copyInfo, setCopyInfo] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const user = useUser((state) => state.user);
  const attendees = useAttendeeStore((state) => state.attendees);
  const updateAttendee = useAttendeeStore((state) => state.updateAttendee);
  const copyAllAttendeeInfos = useAttendeeStore(
    (state) => state.copyAllAttendeeInfos
  );
  const removeAttendeeInfos = useAttendeeStore(
    (state) => state.removeAttendeeInfos
  );
  // console.log("attendees", attendees);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (copyInfo && e.target.form?.className.split(" ")[1] === "form-1") {
      copyAllAttendeeInfos(e.target.form?.id || "");
      updateAttendee(e.target.form?.id || "", e.target.id, e.target.value);
    } else {
      updateAttendee(e.target.form?.id || "", e.target.id, e.target.value);
    }
  };

  const handleCopyInfoChange = (checked: boolean) => {
    setCopyInfo(checked);
    if (checked) {
      copyAllAttendeeInfos(attendees[0].product_id);
    } else {
      removeAttendeeInfos(attendees[0].product_id);
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
          key={ticket.product_id}
        >
          <AccordionItem value={`item-${index}`}>
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
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter your city / community"
                      value={
                        attendees.find(
                          (a) => a.product_id === ticket.product_id
                        )?.city || ""
                      }
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Note</Label>
                  <div className="relative">
                    <Notebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="note"
                      type="text"
                      placeholder=""
                      value={
                        attendees.find(
                          (a) => a.product_id === ticket.product_id
                        )?.note || ""
                      }
                      onChange={handleChange}
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
        </form>
      ))}
    </Accordion>
  );
}
