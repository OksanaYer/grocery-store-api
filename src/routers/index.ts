// import { Router } from "express";
// import userRouter from "./userRouter.ts";
// import productRouter from "./productRouter.ts";
// export { default as userRoutes } from './userRouter.ts';
// export { default as productRouter } from './productRouter.ts';

import { Router } from "express";
import userRouter from "./userRouter.ts";
import productRouter from "./productRouter.ts";
import categoryRouter from "./categoryRouter.ts";
import orderRouter from "./orderRouter.ts";



const router = Router();
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
export default router;
