import { PrismaClient, SaleStatus } from "@camaras/database";

export class SaleService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createSale(data: {
        photographerId: string;
        packageId: string;
        discountCodeId?: string;
        dayId: string;
        timeSlotId: string;
        price: number;
        methodPayment: "CASH" | "CREDIT_CARD" | "NEQUI";
    }, userId: string) {
        try {
            // Encontrar al usuario y que tenga rol de user
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user || user.role !== "user") {
                throw new Error("User not found or not authorized");
            }

            // Validar el fotografo
            await this.validatePhotographer(data.photographerId);
            
            // Validar el paquete
            await this.validatePackage(data.packageId);

            // Validar la fecha y su disponibilidad
            await this.validateDay(data.dayId, data.timeSlotId);

            // Validar el cupon solo si se envio
            let discountCode = null;
            let discountPercentage = 0;
            let finalPrice = data.price;

            if (data.discountCodeId) {
                discountCode = await this.validateCoupon(data.discountCodeId);
                discountPercentage = discountCode.discountPercentage;
                finalPrice = data.price - (data.price * discountCode.discountPercentage / 100);
            }

            let confirmPayment = false;
            let status: SaleStatus = SaleStatus.PENDING;
            if (data.methodPayment !== "CASH") {
                confirmPayment = true;
                status = SaleStatus.COMPLETED;
            }
            

            // Crear la venta
            const sale = await this.prisma.sale.create({
                data: {
                    buyer: {
                        connect: {
                            id: user.id,
                        },
                    },
                    photographer: {
                        connect: {
                            id: data.photographerId,
                        },
                    },
                    package: {
                        connect: {
                            id: data.packageId,
                        },
                    },
                    discountCode: {
                        connect: {
                            id: data.discountCodeId,
                        },
                    },
                    day: {
                        connect: {
                            id: data.dayId,
                        },
                    },
                    timeSlot: {
                        connect: {
                            id: data.timeSlotId,
                        },
                    },
                    price: data.price,
                    discountPercentage: discountPercentage,
                    finalPrice: finalPrice,
                    methodPayment: data.methodPayment,
                    paymentConfirmation: confirmPayment,
                    saleStatus: status,
                },
            });

            // Marcar como booked el time slot
            await this.prisma.timeSlot.update({
                where: {
                    id: data.timeSlotId,
                },
                data: {
                    isBooked: true,
                },
            });

            return {
                status: 200,
                message: "Venta creada correctamente",
                sale,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSalesByPhotographer(photographerId: string) {
        try {
            const sales = await this.prisma.sale.findMany({
                where: {
                    photographerId,
                },
                select: {
                    id: true,
                    buyer: {
                        select: {
                            name: true,
                        },
                    },
                    saleStatus: true,
                    package: {
                        select: {
                            name: true,
                        },
                    },
                    finalPrice: true,
                    discountCode: {
                        select: {
                            discountPercentage: true,
                        },
                        where: {
                            discountPercentage: {
                                not: 0,
                            },
                        },
                    },
                },
            });
            const formattedSales = sales.map(sale => ({
                id: sale.id,
                buyerName: sale.buyer.name,
                status: sale.saleStatus,
                packageName: sale.package.name,
                price: sale.finalPrice,
                hasDiscount: !!sale.discountCode?.discountPercentage,
            }));
            return {
                status: 200,
                message: "Sales found",
                sales: formattedSales,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSalesByUser(userId: string) {
        try {
            const sales = await this.prisma.sale.findMany({
                where: {
                    buyerId: userId,
                },
                select: {
                    id: true,
                    buyer: {
                        select: {
                            name: true,
                            email: true,
                            phoneNumber: true,
                        },
                    },
                    saleStatus: true,
                    package: {
                        select: {
                            name: true,
                        },
                    },
                    finalPrice: true,
                    discountCode: {
                        select: {
                            discountPercentage: true,
                        },
                        where: {
                            discountPercentage: {
                                not: 0,
                            },
                        },
                    },
                },
            });
            return {
                status: 200,
                message: "Sales found",
                sales,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSaleByPhotographerAndId(id: string, photographerId: string) {
        try {
            const sale = await this.prisma.sale.findUnique({
                where: {
                    id,
                    photographerId,
                },
                select: {
                    id: true,
                    buyer: {
                        select: {
                            name: true,
                            email: true,
                            phoneNumber: true,
                            id: true,
                        }
                    },
                    package: {
                        select: {
                            name: true,
                            price: true,
                            photoCount: true,
                        }
                    },
                    discountCode: {
                        select: {
                            code: true,
                            discountPercentage: true,
                        },
                        where: {
                            discountPercentage: {
                                not: 0,
                            },
                        },
                    },
                    finalPrice: true,
                    saleStatus: true,
                    paymentConfirmation: true,
                    paymentConfirmationAt: true,
                    cancelledAt: true,
                    cancelledById: true,
                    methodPayment: true,
                    createdAt: true,
                    price: true,
                    updatedAt: true,
                    day: {
                        select: {
                            date: true,
                        }
                    },
                    timeSlot: {
                        select: {
                            start: true,
                            end: true,
                            ampmStart: true,
                            ampmEnd: true,
                        }
                    }
                },
            });
            return {
                status: 200,
                message: "Sale found",
                sale,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSaleByUserAndId(userId: string, saleId: string) {
        try {
            const sale = await this.prisma.sale.findUnique({
                where: {
                    id: saleId,
                    buyerId: userId,
                },
            });
            return {
                status: 200,
                message: "Sale found",
                sale,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async confirmSale(saleId: string, userId: string) {
        try {
            const sale = await this.prisma.sale.update({
                where: {
                    id: saleId,
                    photographerId: userId,
                },
                data: {
                    paymentConfirmation: true,
                    saleStatus: SaleStatus.COMPLETED,
                },
            });
            return {
                status: 200,
                message: "Sale confirmed",
                sale,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async validatePhotographer(photographerId: string) {
        const photographer = await this.prisma.user.findUnique({
            where: {
                id: photographerId,
            },
        });
        if (!photographer) {
            throw new Error("Photographer not found");
        }
    }

    private async validatePackage(packageId: string) {
        const photoPackage = await this.prisma.package.findUnique({
            where: {
                id: packageId,
            },
        });
        if (!photoPackage) {
            throw new Error("Package not found");
        }
    }

    private async validateDay(dayId: string, timeSlotId: string) {
        const day = await this.prisma.availableDay.findUnique({
            where: {
                id: dayId,
            },
        });

        if (!day) {
            throw new Error("Day not found");
        }

        const timeSlot = await this.prisma.timeSlot.findUnique({
            where: {
                id: timeSlotId,
            },
        });
        if (!timeSlot || timeSlot.isBooked) {
            throw new Error("Time slot not available");
        }
    }

    private async validateCoupon(discountCodeId: string) {
        const discountCode = await this.prisma.discount.findUnique({
            where: {
                id: discountCodeId,
            },
        });
        if (!discountCode || discountCode.expirationDate < new Date() || !discountCode.isActive) {
            throw new Error("Discount code not found or expired");
        }
        return discountCode;
    }
}
