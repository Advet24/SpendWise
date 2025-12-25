import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const UserService = {

    async getUsers() {
        const [rows] = await pool.query(`
            SELECT id, name, email, createdAt 
            FROM users
        `);
        return rows;
    },

    async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `, [name, email, hashedPassword]);

        return { id: result.insertId, name, email };
    },

    async getUserByEmail(email) {
        const [rows] = await pool.query(`
            SELECT * FROM users
            WHERE email = ?
        `, [email]);
        return rows[0];
    },

    async getUserById(id) {
        const [rows] = await pool.query(`
            SELECT id, name, email, createdAt 
            FROM users
            WHERE id = ?
        `, [id]);
        return rows[0];
    },

    async verifyPassword(plain, hashed) {
        return bcrypt.compare(plain, hashed);
    }
};
