import { Router } from "express";
import patientRouter from "./patientRouter.js";
var router = Router();
router.use(patientRouter);
export default router;
