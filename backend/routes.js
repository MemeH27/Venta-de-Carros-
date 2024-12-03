const express = require("express");
const router = express.Router();
const mailServices = require("./mailServices");

router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      await mailServices.sendWelcomeEmail(email, name);
      res.status(200).json({ message: "Usuario registrado con éxito" });  // Respuesta en formato JSON
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al registrar al usuario" });  // Respuesta de error en formato JSON
    }
  });
  

module.exports = router;
