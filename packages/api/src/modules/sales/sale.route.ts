import Elysia, { t } from "elysia";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { saleModule } from "@camaras/api/src/modules/sales/sale.module";

export const saleRouter = new Elysia({
  prefix: "/sale",
    name: "sale",
})
.use(betterAuth)
.use(saleModule)
.post("/", ({ saleService, body }) => saleService.createSale(body), {
    body: t.Object({
        photographerId: t.String(),
        packageId: t.String(),
        discountCodeId: t.Optional(t.String()),
        dayId: t.String(),
        timeSlotId: t.String(),
        price: t.Number(),
        methodPayment: t.Enum({
            CASH: "CASH",
            NEQUI: "NEQUI",
        }),
        buyerPhoneNumber: t.String(),
        buyerName: t.String(),
        buyerEmail: t.String(),
        buyerCharacter: t.String(),
    }),
})
.get("/", ({ saleService, user }) => saleService.getSales(user.id), {
    photographer: true,
})
.get("/:id", ({ saleService, params, user }) => saleService.getSaleById(params.id, user.id), {
    photographer: true,
})
.post("/confirm/:id", ({ saleService, params, user }) => saleService.confirmSale(params.id, user.id), {
    photographer: true,
})
.post("/payment/:id", ({ saleService, params }) => saleService.confirmPayment(params.id), {
    photographer: true,
})
.post("/cancel/:id", ({ saleService, params }) => saleService.cancelSale(params.id), {
    photographer: true,
})
.post("/noshow/:id", ({ saleService, params }) => saleService.noShowSale(params.id), {
    photographer: true,
})

