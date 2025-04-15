import Elysia from "elysia";
import { ordersService } from "./services";

const orderRouter = new Elysia().get("/orders", async (req) => {
  const orders = await ordersService.getAllOrders();
  return { orders };
});

export default orderRouter;