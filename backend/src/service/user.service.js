import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const UserService = {

    async getUsers() {
        const [rows] = await pool.query(`
            select id , name , email , createdAt 
            from user`)
        return rows;
    },

    async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(`
            insert into user (name , email , password)
            values ( ? , ? , ? )
        ` , [name, email, hashedPassword]);
        return { id: result.insertId, name, email };
    },

    async getUserByEmail(email) {
        const [rows] = await pool.query(`
            select * from user
            where email = ? 
        ` , [email]);
        return rows[0];
    },

    async getUserById(id) {
        const [rows] = await pool.query(`
            select id , name , email , createdAt 
            from user
            where id = ? 
        ` , [id]);
        return rows[0];
    }

}