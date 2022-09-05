import expres from "express";
const router = expres.Router();
import {
	registrar,
	autenticar,
	confirmar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
	perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
//Autenticación, registro y Confirmación de Usuarios

router.post("/", registrar); // Crea un nuevo Usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;
