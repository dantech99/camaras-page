import { PrismaClient } from "@camaras/database/generated/database/client";

interface TimeSlotData {
  startTime: string;
  endTime: string;
  ampmStart: string;
  ampmEnd: string;
  availableDayId: string;
}

interface UpdateTimeSlotData extends TimeSlotData {
  id: string;
}

export class TimeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createMultipleTimeSlots(timeSlots: TimeSlotData[]) {
    try {
      // Preparar los datos para la inserción
      const timeSlotsData = timeSlots.map(slot => ({
        start: slot.startTime,
        end: slot.endTime,
        ampmStart: slot.ampmStart,
        ampmEnd: slot.ampmEnd,
        availableDayId: slot.availableDayId,
      }));

      // Usar createMany para insertar múltiples registros de una vez
      const result = await this.prisma.timeSlot.createMany({
        data: timeSlotsData,
      });

      return {
        count: result.count,
        message: `Se crearon ${result.count} horarios exitosamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  deleteTimeSlot(id: string) {
    try {
      const deletedTimeSlot = this.prisma.timeSlot.delete({
        where: {
          id,
        },
      });
      return deletedTimeSlot;
    } catch (error) {
      throw error;
    }
  }

  async updateMultipleTimeSlots(timeSlots: UpdateTimeSlotData[]) {
    try {
      // Usar una transacción para asegurar que todas las actualizaciones se realicen o ninguna
      const result = await this.prisma.$transaction(
        timeSlots.map(slot =>
          this.prisma.timeSlot.update({
            where: { id: slot.id },
            data: {
              start: slot.startTime,
              end: slot.endTime,
              ampmStart: slot.ampmStart,
              ampmEnd: slot.ampmEnd,
              availableDayId: slot.availableDayId,
            },
          })
        )
      );

      return {
        count: result.length,
        updatedTimeSlots: result,
        message: `Se actualizaron ${result.length} horarios exitosamente`,
      };
    } catch (error) {
      throw error;
    }
  }
}
