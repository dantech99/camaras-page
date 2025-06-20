import { apiClient } from "@/utils/api-connection";

export const SaleService = {
    create: async (data: {
        photographerId: string;
        packageId: string;
        discountCodeId?: string;
        dayId: string;
        timeSlotId: string;
        buyerCharacter: string;
        buyerName: string;
        buyerPhoneNumber: string;
        buyerEmail: string;
        price: number;
        methodPayment: "CASH" | "NEQUI";
    }) => {
        const response = await apiClient.sale.index.post(
            {
                discountCodeId: data.discountCodeId,
                photographerId: data.photographerId,
                packageId: data.packageId,
                dayId: data.dayId,
                timeSlotId: data.timeSlotId,
                buyerCharacter: data.buyerCharacter,
                buyerName: data.buyerName,
                buyerPhoneNumber: data.buyerPhoneNumber,
                buyerEmail: data.buyerEmail,
                price: data.price,
                methodPayment: data.methodPayment,
            },
            {
                fetch: {
                    credentials: "include",
                },
            }
        );
        return response.data;
    },

    // Photographer
    getSalesByPhotographer: async () => {
        const response = await apiClient.sale.photographer.get(
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },

    getSalesByPhotographerAndId: async (saleId: string) => {
        const response = await apiClient.sale.photographer({ id: saleId }).get({
            fetch: {
                credentials: "include",
            }
        });
        return response.data;
    },

    confirmSale: async (saleId: string) => {
        const response = await apiClient.sale.confirm({ id: saleId }).post(
            {},
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },
}