import { create } from "zustand";

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

interface DateStore {
  date: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
}

interface DataStoreState {
  dataStore: DateStore;
  setDate: (date: string) => void;
  setTimeSlots: (timeSlots: TimeSlot[]) => void;
  addTimeSlot: (timeSlot: TimeSlot) => void;
  removeTimeSlot: (timeSlot: TimeSlot) => void;
  clearTimeSlots: () => void;
}

export const useDateStore = create<DataStoreState>((set) => ({
  dataStore: {
    date: "",
    isActive: false,
    timeSlots: [],
  },
  setDate: (date) =>
    set((state) => ({ dataStore: { ...state.dataStore, date } })),
  setTimeSlots: (timeSlots) =>
    set((state) => ({ dataStore: { ...state.dataStore, timeSlots } })),
  addTimeSlot: (timeSlot) =>
    set((state) => ({
      dataStore: {
        ...state.dataStore,
        timeSlots: [...state.dataStore.timeSlots, timeSlot],
      },
    })),
  removeTimeSlot: (timeSlot) =>
    set((state) => ({
      dataStore: {
        ...state.dataStore,
        timeSlots: state.dataStore.timeSlots.filter(
          (slot) => slot.start !== timeSlot.start && slot.end !== timeSlot.end
        ),
      },
    })),
  clearTimeSlots: () =>
    set((state) => ({ dataStore: { ...state.dataStore, timeSlots: [] } })),
}));
