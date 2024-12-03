const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'yayirobe2305@gmail.com', // Reemplaza con tu correo
      pass: 'peix zrwo uiyd nstm', // Contraseña generada desde Google
    },
  });

  const mailOptions = {
    from: "yayirobe2305@gmail.com", // Reemplaza con tu correo
    to: email,
    subject: "¡Bienvenido a Venta de Carros!",
    text: `Hola ${name},\n\nGracias por registrarte en nuestra plataforma.\n\nSaludos,\nEl equipo de Venta de Carros.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente a:", email);
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw error; // Lanza el error para que se maneje en `server.js`
  }
};

module.exports = {
  sendWelcomeEmail,
};
