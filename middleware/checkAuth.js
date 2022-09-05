import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
const checkAuth = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { id } = decoded;
			req.usuario = await Usuario.findOne({ id }).select(
				"-password -confirmado -token -createdAt -updatedAt -__v",
			);
			console.log(req.usuario);
			return next();
		} catch (error) {
			res.status(404).json({ mgs: "Hubo un error" });
		}
	}
	if (!token) {
		const error = new Error("Token no Válido");
		res.status(401).json({ msg: error.message });
	}
};

export default checkAuth;
