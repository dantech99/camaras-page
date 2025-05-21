import { create } from "zustand";

enum PaymentMethod {
  CASH,
  CREDIT_CARD,
  NEQUI,
}

interface SaleStore {
  photographerId: string;
  photographerName: string;

  packageId: string;
  packageName: string;
  packagePrice: number;
  packageFinalPrice: number;

  discountCode: string;
  discountId: string;

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
}

export const useSaleStore = create<SaleStore & SaleStoreActions>((set) => ({
  photographerId: "",
  photographerName: "",
  packageId: "",
  packageName: "",
  packagePrice: 0,
  packageFinalPrice: 0,
  discountCode: "",
  discountId: "",
  methodPayment: PaymentMethod.CASH,

  setPhotographerId: (id: string) => set({ photographerId: id }),
  setPhotographerName: (name: string) => set({ photographerName: name }),
  setPackageId: (id: string) => set({ packageId: id }),
  setPackageName: (name: string) => set({ packageName: name }),
  setPackagePrice: (price: number) => set({ packagePrice: price }),
  setPackageFinalPrice: (price: number) => set({ packageFinalPrice: price }),
  setDiscountCode: (code: string) => set({ discountCode: code }),
  setDiscountId: (id: string) => set({ discountId: id }),
  setMethodPayment: (method: PaymentMethod) => set({ methodPayment: method }),
}));
