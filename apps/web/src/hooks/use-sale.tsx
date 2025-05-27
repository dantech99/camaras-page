import { useQuery } from "@tanstack/react-query";
import { SaleService } from "@/services/sale-service";

export const useSalesPhotographer = () => {
    return useQuery({
        queryKey: ["sales-photographer"],
        queryFn: () => SaleService.getSalesByPhotographer(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
};

export const useSaleByPhotographerAndId = (id: string) => {
    return useQuery({
        queryKey: ["sale-photographer", id],
        queryFn: () => SaleService.getSalesByPhotographerAndId(id),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}

export const useSalesUser = () => {
    return useQuery({
        queryKey: ["sales-user"],
        queryFn: () => SaleService.getSalesByUser(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}