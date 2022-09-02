import expres from "express";
const router = expres.Router();
import {
	registrar,
	autenticar,
	confirmar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
} from "../controllers/usuarioController.js";
//Autenticación, registro y Confirmación de Usuarios

router.post("/", registrar); // Crea un nuevo Usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

export default router;
