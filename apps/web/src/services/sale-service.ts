import { apiClient } from "@/utils/api-connection";

export const SaleService = {
    create: async (data: {
        photographerId: string;
        packageId: string;
        discountCodeId: string;
        dayId: string;
        timeSlotId: string;
        price: number;
        methodPayment: "CASH" | "CREDIT_CARD" | "NEQUI";
    }) => {
        const response = await apiClient.sale.index.post(
            data,
            {
                fetch: {
                    credentials: "include",
                },
            }
        );
        return response.data;
    },
}