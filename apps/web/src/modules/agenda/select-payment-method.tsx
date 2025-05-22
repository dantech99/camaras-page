"use client"

import { Card } from "@camaras/ui/src/components/card"
import { WalletMinimal, CreditCardIcon, ArrowLeftRight } from "lucide-react"
import { useSaleStore, PaymentMethod } from "@/modules/agenda/store/sale.store"

export function SelectPaymentMethod() {
    const { setMethodPayment, methodPayment } = useSaleStore()
    
    const handleSelectPaymentMethod = (method: PaymentMethod) => {
        setMethodPayment(method)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Card onClick={() => handleSelectPaymentMethod(PaymentMethod.CASH)} className={`flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.CASH ? "border-2 border-primary-blue" : ""}`}>
                <WalletMinimal />
                {PaymentMethod.CASH}
            </Card>
            <Card onClick={() => handleSelectPaymentMethod(PaymentMethod.CREDIT_CARD)} className={`flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.CREDIT_CARD ? "border-2 border-primary-blue" : ""}`}>
                <CreditCardIcon />
                {PaymentMethod.CREDIT_CARD}
            </Card>
            <Card onClick={() => handleSelectPaymentMethod(PaymentMethod.NEQUI)} className={`flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${methodPayment === PaymentMethod.NEQUI ? "border-2 border-primary-blue" : ""}`}>
                <ArrowLeftRight />
                {PaymentMethod.NEQUI}
            </Card>
        </div>
    )
}