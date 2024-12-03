const express = require("express");
const bodyParser = require("body-parser");
const mailServices = require("./mailServices"); // Importa el servicio de correo

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  console.log({ email, password }); // Para verificar los datos recibidos

  try {
    await mailServices.sendWelcomeEmail(email, name || "Usuario");
    res.status(200).json({ success: true, message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ success: false, message: "Hubo un error al registrar al usuario" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});


