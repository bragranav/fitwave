// api/login.js
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], async (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error interno del servidor.' });
                return;
            }

            if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
                res.status(400).json({ error: 'Usuario o contraseña incorrectos.' });
            } else {
                res.status(200).json({ message: 'Inicio de sesión exitoso.' });
            }
        });
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}
/*// Manejo de formularios
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/login', {
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

    const response = await fetch('/register', {
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
*/
