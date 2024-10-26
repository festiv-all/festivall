import { create } from "zustand";
import { cartProduct } from "../types/cartProduct";
import { persist } from "zustand/middleware";
import { Attendee } from "../types/attendee";

interface AttendeeState {
  attendees: Attendee[];
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addAttendee: (attendee: Attendee) => void;
  updateAttendee: (product_id: string, field: string, value: string) => void;
  removeAttendee: (attendee: Attendee) => void;
  cleanAttendees: () => void;
  addAttendeeName: (value: string) => void;
  removeAttendeeName: (product_id: string) => void;
}

// Initialize a default state
const INITIAL_STATE: AttendeeState = {
  attendees: [],
};

// Create the store with Zustand, combining the status interface and actions
export const useAttendeeStore = create(
  persist<AttendeeState & Actions>(
    (set, get) => ({
      attendees: INITIAL_STATE.attendees,
      getAttendees: () => get().attendees,
      addAttendee: (attendee: Attendee) => {
        const otherAttendees = get().attendees.filter(
          (att) => att.product_id !== attendee.product_id
        );
        set((state) => ({
          attendees: [...otherAttendees, attendee],
        }));
      },
      updateAttendee: (product_id: string, field: string, value: string) => {
        set((state) => ({
          attendees: state.attendees.map((a) =>
            a.product_id === product_id ? { ...a, [field]: value } : a
          ),
        }));
      },
      removeAttendee: (attendee: Attendee) => {
        set((state) => ({
          attendees: state.attendees.filter(
            (item) => item.product_id !== attendee.product_id
          ),
        }));
      },
      cleanAttendees: () => {
        set(() => ({
          attendees: [],
        }));
      },
      addAttendeeName: (value: string) => {
        set((state) => ({
          attendees: state.attendees.map((a) => ({ ...a, name: value })),
        }));
      },
      removeAttendeeName: (product_id) => {
        set((state) => ({
          attendees: state.attendees.map((a) =>
            a.product_id !== product_id ? { ...a, name: "" } : a
          ),
        }));
      },
    }),
    {
      name: "attendee-storage",
    }
  )
);
export default useAttendeeStore;
