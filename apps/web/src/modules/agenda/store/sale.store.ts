import { create } from "zustand";

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  NEQUI = "NEQUI",
}

interface SaleStore {
  photographerId: string;
  photographerName: string;

  packageId: string;
  packageName: string;
  packagePrice: number;
  packageFinalPrice: number;

  day: string;
  dayId: string;
  timeSlot: string;
  timeSlotId: string;

  discountCode: string;
  discountId: string;

  phoneNumber: string;
  isVerified: boolean;
  email: string;
  name: string;
  character: string;

  methodPayment: PaymentMethod;
}

interface SaleStoreActions {
  setPhotographerId: (id: string) => void;
  setPhotographerName: (name: string) => void;
  setPackageId: (id: string) => void;
  setPackageName: (name: string) => void;
  setPackagePrice: (price: number) => void;
  setPackageFinalPrice: (price: number) => void;
  setDiscountCode: (code: string) => void;
  setDiscountId: (id: string) => void;
  setMethodPayment: (method: PaymentMethod) => void;
  setDay: (day: string) => void;
  setDayId: (id: string) => void;
  setTimeSlot: (timeSlot: string) => void;
  setTimeSlotId: (id: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setCharacter: (character: string) => void;
}

export const useSaleStore = create<SaleStore & SaleStoreActions>((set) => ({
  photographerId: "",
  photographerName: "",
  packageId: "",
  packageName: "",
  packagePrice: 0,
  packageFinalPrice: 0,
  day: "",
  dayId: "",
  timeSlot: "",
  timeSlotId: "",
  discountCode: "",
  discountId: "",
  phoneNumber: "",
  name: "",
  character: "",
  isVerified: false,
  email: "",
  methodPayment: PaymentMethod.CASH,

  setPhotographerId: (id: string) => set({ photographerId: id }),
  setPhotographerName: (name: string) => set({ photographerName: name, packageId: "", packageName: "", packagePrice: 0, packageFinalPrice: 0 }),
  setPackageId: (id: string) => set({ packageId: id }),
  setPackageName: (name: string) => set({ packageName: name }),
  setPackagePrice: (price: number) => set({ packagePrice: price }),
  setPackageFinalPrice: (price: number) => set({ packageFinalPrice: price }),
  setDiscountCode: (code: string) => set({ discountCode: code }),
  setDiscountId: (id: string) => set({ discountId: id }),
  setMethodPayment: (method: PaymentMethod) => set({ methodPayment: method }),
  setDay: (day: string) => set({ day }),
  setDayId: (id: string) => set({ dayId: id }),
  setTimeSlot: (timeSlot: string) => set({ timeSlot }),
  setTimeSlotId: (id: string) => set({ timeSlotId: id }),
  setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
  setName: (name: string) => set({ name }),
  setCharacter: (character: string) => set({ character }),
  setIsVerified: (isVerified: boolean) => set({ isVerified }),
  setEmail: (email: string) => set({ email }),
}));
