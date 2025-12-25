import pool from "../config/db.js";

export const CategoryService = {

    async getCategories(userId) {
        const [rows] = await pool.query(
            `SELECT * FROM categories WHERE userId = ?`,
            [userId]
        );
        return rows;
    },

    async createCategory(userId, name, type) {
        const [result] = await pool.query(
            `INSERT INTO categories (userId, categoryName, categoryType)
       VALUES (?, ?, ?)`,
            [userId, name, type]
        );
        return result.insertId;
    },

    async updateCategory(id, userId, name, type) {
        const [res] = await pool.query(
            `UPDATE categories 
       SET categoryName=?, categoryType=?
       WHERE id=? AND userId=?`,
            [name, type, id, userId]
        );
        return res.affectedRows > 0;
    },

    async deleteCategory(id, userId) {
        const [res] = await pool.query(
            `DELETE FROM categories WHERE id=? AND userId=?`,
            [id, userId]
        );
        return res.affectedRows > 0;
    }

};
