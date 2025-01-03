document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/backend/login', { // Cambia aquí la ruta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const message = document.getElementById("message");
    if (response.ok) {
        message.textContent = "Inicio de sesión exitoso.";
        message.style.color = "green";
        // Redirigir a index.html
        window.location.href = "frontend/index.html";
    } else {
        message.textContent = "Usuario o contraseña incorrectos.";
        message.style.color = "red";
    }
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/backend/register', { // Cambia aquí la ruta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const message = document.getElementById("message");
    if (response.ok) {
        message.textContent = "Registro exitoso.";
        message.style.color = "green";
    } else {
        const errorText = await response.text();
        message.textContent = errorText;
        message.style.color = "red";
    }
});
/*require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'frontend/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'frontend/register.html')));
app.get('/index', (req, res) => {
    // Asegúrate de que la ruta esté correcta
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});
app.get('/index.html', (req, res) => {
    // Redirige si la cookie de usuario no está presente
    if (!req.cookies.username) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Registro de usuarios
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('El usuario o el correo ya están registrados.');
            } else {
                res.status(500).send('Error interno del servidor.');
            }
        } else {
            res.status(200).send('Registro exitoso.');
        }
    });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            res.status(500).send('Error interno del servidor.');
        } else
            if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            res.status(400).send('Usuario o contraseña incorrectos.');
        } else {
            // Iniciar sesión y redirigir al frontend con el nombre de usuario
            res.cookie('username', results[0].username, { maxAge: 900000});
            res.status(200).send('Inicio de sesión exitoso.');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
*/