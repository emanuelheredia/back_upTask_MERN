const generarID = () => {
	const random = Math.random().toString(32).substring(2);
	const fecha = Date.now().toString().substring(2);
	return random + fecha;
};

export default generarID;
