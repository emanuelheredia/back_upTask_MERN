import Usuario from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailDeRegistro, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {
	const { email } = req.body;
	const usuarioExiste = await Usuario.findOne({ email });
	if (usuarioExiste) {
		const error = new Error("Usuario existente");
		return res.status(404).json({ msg: error.message });
	}

	try {
		const usuario = new Usuario(req.body);
		usuario.token = generarID();
		await usuario.save();
		//Enviar el email de confirmacion
		emailDeRegistro({
			email: usuario.email,
			nombre: usuario.nombre,
			token: usuario.token,
		});
		res.json({
			msg: "Usuario Creado Correctamente, revisa tu email para confirmar",
		});
	} catch (error) {}
};

const autenticar = async (req, res) => {
	const { email, password } = req.body;
	//Comprobar si el usuario exite
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		const error = new Error("Usuario no registrado");
		return res.status(404).json({ msg: error.message });
	}
	if (!usuario.confirmado) {
		const error = new Error("Tu cuenta no ha sido confirmada");
		return res.status(403).json({ msg: error.message });
	}
	if (await usuario.corroborarPassword(password)) {
		res.json({
			_id: usuario._id,
			nombre: usuario.nombre,
			email: usuario.email,
			token: generarJWT(usuario._id),
		});
	} else {
		const error = new Error("El Password es incorrecto");
		return res.status(403).json({ msg: error.message });
	}

	//Comprobar si el usuario está confirmado

	// Comprobar su password
};

const confirmar = async (req, res) => {
	const { token } = req.params;
	const usuarioConfirmar = await Usuario.findOne({ token });
	if (!usuarioConfirmar) {
		const error = new Error("Token no válido");
		return res.status(403).json({ msg: error.message });
	}
	try {
		usuarioConfirmar.confirmado = true;
		usuarioConfirmar.token = "";
		await usuarioConfirmar.save();
		res.json({ msg: "Usuario confirmado correctamente" });
	} catch (error) {
		console.log(error);
	}
};
const olvidePassword = async (req, res) => {
	const { email } = req.body;
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		const error = new Error("Usuario no registrado");
		return res.status(404).json({ msg: error.message });
	}
	try {
		usuario.token = generarID();
		await usuario.save();
		emailOlvidePassword({
			email: usuario.email,
			nombre: usuario.nombre,
			token: usuario.token,
		});
		res.json({ msg: "Hemos enviado un email con las instrucciones" });
	} catch (error) {
		res.json(error);
	}
};
const comprobarToken = async (req, res) => {
	const { token } = req.params;
	const tokenExiste = await Usuario.findOne({ token });
	if (tokenExiste) {
		res.json({ msg: "Token válido y el usuario existe" });
	} else {
		const error = new Error("Token no válido");
		return res.status(404).json({ msg: error.message });
	}
};

const nuevoPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;
	const usuario = await Usuario.findOne({ token });
	if (usuario) {
		usuario.password = password;
		usuario.token = "";
		try {
			await usuario.save();
			res.json({ msg: "Password modificado Correctamente" });
		} catch (error) {
			console.log(error);
		}
	} else {
		const error = new Error("Token no válido");
		return res.status(404).json({ msg: error.message });
	}
};
const perfil = async (req, res) => {
	const { usuario } = req;
	res.json(usuario);
};

export {
	registrar,
	autenticar,
	confirmar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
	perfil,
};
