import { Router } from "express";
import {
  getRegisters,
  getRegister,
  createRegister,
  updateRegister,
  deleteRegister,
} from "../controllers/registers.controllers.js";

const router = Router();

router.get("/register", getRegisters); /*mostrar todos los registros*/

router.get("/register/:id", getRegister); /*mostrar un registor en especifico*/

router.post("/register", createRegister); /*subir un registro*/

router.put("/register/:id", updateRegister); /*editar un registro*/

router.delete("/register/:id", deleteRegister); /*eliminar un registro*/

export default router;
