"use client"

import { useSaleStore } from "@/modules/agenda/store/sale.store"

export function ConfirmPayment() {
    const { photographerName, packageName, packagePrice, day, timeSlot, methodPayment } = useSaleStore();
    return (
        <div>
            <p>Photographer: {photographerName}</p>
            <p>Package: {packageName}</p>
            <p>Price: {packagePrice}</p>
            <p>Day: {day}</p>
            <p>Time Slot: {timeSlot}</p>
            <p>Payment Method: {methodPayment}</p>
        </div>
    )
}