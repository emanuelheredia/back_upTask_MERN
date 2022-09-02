import expres from "express";
const router = expres.Router();
import { registrar, autenticar } from "../controllers/usuarioController.js";
//Autenticación, registro y Confirmación de Usuarios

router.post("/", registrar); // Crea un nuevo Usuario
router.post("/login", autenticar);

export default router;
