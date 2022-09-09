import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
	const { proyecto } = req.body;
	const existeProyecto = await Proyecto.findById(proyecto);
	console.log(existeProyecto);
	if (!existeProyecto) {
		const error = new Error("El proyecto no existe");
		res.status(404).json({ msg: error.message });
	}
	if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error("No tiene los permisos adecuados");
		return res.status(401).json({ msg: error.message });
	}
	try {
		const tareaAlmacenada = await Tarea.create(req.body);
		res.json(tareaAlmacenada);
	} catch (error) {}
};
const obtenerTarea = async (req, res) => {};
const actualizarTarea = async (req, res) => {};
const eliminarTarea = async (req, res) => {};
const cambiarEstado = async (req, res) => {};

export {
	agregarTarea,
	obtenerTarea,
	actualizarTarea,
	eliminarTarea,
	cambiarEstado,
};
