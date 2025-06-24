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

    getSales: async () => {
        const response = await apiClient.sale.index.get(
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },

    getSaleById: async (saleId: string) => {
        const response = await apiClient.sale({ id: saleId }).get({
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

    confirmPayment: async (saleId: string) => {
        const response = await apiClient.sale.payment({ id: saleId }).post(
            {},
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },

    cancelSale: async (saleId: string) => {
        const response = await apiClient.sale.cancel({ id: saleId }).post(
            {},
            {
                fetch: {
                    credentials: "include",
                }
            }
        );
        return response.data;
    },

    noShowSale: async (saleId: string) => {
        const response = await apiClient.sale.noshow({ id: saleId }).post(
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