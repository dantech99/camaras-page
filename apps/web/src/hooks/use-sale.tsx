import { useQuery } from "@tanstack/react-query";
import { SaleService } from "@/services/sale-service";

export const useSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: () => SaleService.getSales(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
};

export const useSaleById = (id: string) => {
    return useQuery({
        queryKey: ["sale", id],
        queryFn: () => SaleService.getSaleById(id),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}