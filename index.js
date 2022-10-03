import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoute from "./routes/tareaRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
conectarDB();
//configurar cors
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Error de Cors"));
		}
	},
};
app.use(cors(corsOptions));
//routing
app.use(express.json());
app.use("/app/usuario", usuarioRoutes);
app.use("/app/proyectos", proyectoRoutes);
app.use("/app/tareas", tareaRoute);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
//Socket io

import { Server } from "socket.io";

const io = new Server(servidor, {
	pingTimeout: 60000,
	cors: {
		origin: process.env.FRONTEND_URL,
	},
});
io.on("connection", (socket) => {
	//console.log("conectado a socket io");
	//Definir los eventos
	socket.on("abrir proyecto", (proyecto) => {
		socket.join(proyecto);
	});
	socket.on("nueva tarea", (tarea) => {
		socket.to(tarea.proyecto).emit("tarea agregada", tarea);
	});
	socket.on("eliminar tarea", (tarea) => {
		socket.to(tarea.proyecto).emit("tarea eliminada", tarea);
	});
	socket.on("editar tarea", (tarea) => {
		socket.to(tarea.proyecto._id).emit("tarea editada", tarea);
	});
	socket.on("completar tarea", (tarea) => {
		socket.to(tarea.proyecto._id).emit("tarea completada", tarea);
	});
});
