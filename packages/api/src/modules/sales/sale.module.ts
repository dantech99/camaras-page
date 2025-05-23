import Elysia from "elysia";
import { SaleService } from "@camaras/api/src/modules/sales/sale.service";

export const saleModule = new Elysia({
    name: "saleModule",
}).decorate(() => ({
    saleService: new SaleService(),
}));
