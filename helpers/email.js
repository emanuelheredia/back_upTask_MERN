import nodemailer from "nodemailer";

export const emailDeRegistro = async (datos) => {
	const { email, nombre, token } = datos;
	const transport = nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "7b2cf77fde8c16",
			pass: "12770a8760035b",
		},
	});
	//Informacion del email
	const info = await transport.sendMail({
		from: `"UpTask - Administrador de Proyectos" <cuentas@uptask.com>`,
		to: email,
		subject: "UpTask - Comprueba tu Cuenta",
		text: "Comprueba tu cuenta en UpTask",
		html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu Cuenta está casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p>
        <p>Si tu no creaste esta Cuenta puedes ignorar el mensaje</p>`,
	});
};
