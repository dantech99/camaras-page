import { useQuery } from '@tanstack/react-query';
import { PhotographersService } from './axios.instance';

export function usePhotographers() {
    return useQuery({
        queryKey: ['photographers'],
        queryFn: () => PhotographersService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}