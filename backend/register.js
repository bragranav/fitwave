// api/register.js
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
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}