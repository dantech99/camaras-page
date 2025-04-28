"use client"

import { usePhotographers } from "@/hooks/use-photographers"

interface Photographer {
    id: string
    name: string
    description: string
    email: string
    image: string
}

export function BuyingTicket() {
    const { data, isLoading, isError } = usePhotographers()

    console.log(data)

    const photographers = data?.photographers || []

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4 h-screen">
                <h2>Escoge tu fotografo</h2>
                <div className="grid grid-cols-2 gap-4">
                    {
                        Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-32 h-32 bg-primary animate-pulse"></div>
                                <h3 className="text-lg font-semibold bg-primary animate-pulse w-32 h-6 mt-2"></h3>
                                <p className="bg-primary animate-pulse w-32 h-4 mt-1"></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    if (!photographers.length) {
        return (
            <div className="flex items-center justify-center p-4 h-screen">
                <h2>No hay fotografos disponibles</h2>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center p-4 h-screen">
                <h2>Error al cargar los fotografos</h2>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center p-4 h-screen">
            <h2>Escoge tu fotografo</h2>
            <div className="grid grid-cols-2 gap-4">
                {photographers.map((photographer: Photographer) => (
                    <div key={photographer.id} className="flex flex-col items-center">
                        <img
                            src={photographer.image}
                            alt={photographer.name}
                            className="w-32 h-32"
                        />
                        <h3 className="text-lg font-semibold">{photographer.name}</h3>
                        <p>{photographer.description}</p>
                        <p>{photographer.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
