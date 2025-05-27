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

    // User
    getSalesByUser: async () => {
        const response = await apiClient.sale.user.get(
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },

    getSalesByUserAndId: async (saleId: string) => {
        const response = await apiClient.sale.user({ id: saleId }).get({
            fetch: {
                credentials: "include",
            }
        });
        return response.data;
    },
}