import { Router } from "express";
import patientRouter from "./patientRouter.js";

const router = Router();

router.use(patientRouter);

export default router;