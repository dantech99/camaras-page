import { useQuery } from '@tanstack/react-query';
import { PhotographersService } from '@/services/photographer-service';

export function usePhotographers() {
    return useQuery({
        queryKey: ['photographers'],
        queryFn: () => PhotographersService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

export function usePhotographersPackages() {
    return useQuery({
        queryKey: ['photographers'],
        queryFn: () => PhotographersService.getPhotographerPackages(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}