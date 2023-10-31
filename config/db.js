import mongoose from "mongoose";

const user = "upTask";
const pass = "upTask123";
const DB_URI = `mongodb+srv://UpTask:${pass}@cluster0.grvewjt.mongodb.net/?retryWrites=true&w=majority`;
/* const conectarDB = async () => {
	console.log(process.env.MONGO_URI);
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const url = `${connection.connection.host}:${connection.connection.port}`;
		console.log(`MongoDB conectado en : ${url}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
}; */
const conectarDB = () => {
	const connect = () => {
		mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	};
	connect();
	const connection = mongoose.connection;
	connection.once("open", () => console.log("DB is connected"));
};
export default conectarDB;
