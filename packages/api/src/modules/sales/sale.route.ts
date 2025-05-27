import Elysia, { t } from "elysia";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { saleModule } from "@camaras/api/src/modules/sales/sale.module";

export const saleRouter = new Elysia({
  prefix: "/sale",
    name: "sale",
})
.use(betterAuth)
.use(saleModule)
.post("/", ({ saleService, user, body }) => saleService.createSale(body, user.id), {
    auth: true,
    body: t.Object({
        photographerId: t.String(),
        packageId: t.String(),
        discountCodeId: t.Optional(t.String()),
        dayId: t.String(),
        timeSlotId: t.String(),
        price: t.Number(),
        methodPayment: t.Enum({
            CASH: "CASH",
            CREDIT_CARD: "CREDIT_CARD",
            NEQUI: "NEQUI",
        }),
    }),
})
.get("/photographer", ({ saleService, user }) => saleService.getSalesByPhotographer(user.id), {
    photographer: true,
})
.get("/user", ({ saleService, user }) => saleService.getSalesByUser(user.id), {
    auth: true,
})
.get("/photographer/:id", ({ saleService, params, user }) => saleService.getSaleByPhotographerAndId(params.id, user.id), {
    photographer: true,
})
.get("/user/:id", ({ saleService, params, user }) => saleService.getSaleByUserAndId(params.id, user.id), {
    auth: true,
})
.post("/confirm/:id", ({ saleService, params, user }) => saleService.confirmSale(params.id, user.id), {
    photographer: true,
})