import Usuario from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";

const registrar = async (req, res) => {
	const { email } = req.body;
	const usuarioExiste = await Usuario.findOne({ email });
	console.log({ usuarioExiste });
	if (usuarioExiste) {
		const error = new Error("Usuario existente");
		return res.status(400).json({ msg: error.message });
	}

	try {
		const usuario = new Usuario(req.body);
		usuario.token = generarID();
		const usuarioAlmacenado = await usuario.save();
		res.json(usuarioAlmacenado);
	} catch (error) {}
};

const autenticar = async () => {};

export { registrar, autenticar };
