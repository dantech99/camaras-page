"use client"

import { useSaleStore } from "./store/sale.store"
import { GlobalStepper } from "./config/stepper.config"
import { getPhotographerPackages } from "@/hooks/use-photographers"
import { Loader2, UserIcon } from "lucide-react"
import { Card } from "@camaras/ui/src/components/card"

export function SelectPackage() {
    const methods = GlobalStepper.useStepper()
    const { photographerId } = useSaleStore()
    const { data, isLoading, isError } = getPhotographerPackages(photographerId)

    console.log(data)

    return (
        <div>
            {
                isLoading ? (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center p-4">
                        <p>Error al cargar los paquetes</p>
                    </div>
                ) : data?.packages?.length === 0 ? (
                    <div className="flex items-center justify-center p-4">
                        <p>No hay paquetes disponibles</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.packages?.map((pkg) => (
                            <Card
                                key={pkg.id}
                                className="flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer"
                                onClick={() => {
                                    methods.goTo("third");
                                }}
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden">
                                    {pkg.imageUrl ? (
                                        <img
                                            src={pkg.imageUrl}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                            <UserIcon className="w-16 h-16 text-gray-600" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-white truncate">
                                            {pkg.name}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-gray-500 truncate">
                                        {pkg.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
