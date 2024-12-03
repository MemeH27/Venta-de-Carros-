const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const mailServices = require("./mailServices");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

const SECRET_KEY = "mi_clave_secreta";

app.post("/register", async (req, res) => {
  console.log('Solicitud de registro recibida:', req.body);
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email y contraseña son obligatorios." });
  }

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }

    if (row) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO usuarios (email, password, name) VALUES (?, ?, ?)", [email, hashedPassword, name], async (insertErr) => {
      if (insertErr) {
        console.error("Error al registrar el usuario:", insertErr);
        return res.status(500).json({ success: false, message: "Error al registrar al usuario: " + insertErr.message });
      }
    
      // Si todo es exitoso
      await mailServices.sendWelcomeEmail(email, name || "Usuario");
    
      const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: '1h' });
    
      res.status(200).json({ success: true, message: "Usuario registrado con éxito.", token });
    });
    
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email y contraseña son obligatorios." });
  }
  db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }

    if (!row) {
      return res.status(404).json({ success: false, message: "El correo no está registrado." });
    }

    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ email, name: row.name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: "Inicio de sesión exitoso.", token });
  });
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: "Acceso denegado. Token requerido." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token inválido." });
    }

    req.user = decoded;
    next()
  });
};

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Acceso permitido', user: req.user });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
