import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); 
//dotenv.config({ path: "./server/.env" });

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, "../assets/img/flyer_ocm.png");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (name, email, num_people, id) => {
  try {
    const mailOptions = {
      from: `Orquesta Cámara Municipal <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Registro exitoso",
      html: `
        <h1>¡Gracias por registrarte, ${name}!</h1>
        <h1>Tu nro. de entrada es: ${id}</h1>
        <p>Hemos recibido el registro de ${num_people} persona(s) para el evento:</p>
        <p>Musical de películas</p>
        <p>Fecha: 04/12/24 a las 20:00hs</p>
        <p>Si necesitas más información, contáctanos.</p>
      `,
      attachments: [
        {
          filename: "flyer_ocm.png",
          path: imagePath,
          cid: "unique@nodemailer",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
