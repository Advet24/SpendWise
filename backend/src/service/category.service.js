import pool from "../config/db.js";

export const CategoryService = {

    async getCategories(userId, page, limit) {

        const offset = (page - 1) * limit;

        // get total count
        const [[{ count }]] = await pool.query(
            `SELECT COUNT(*) AS count 
         FROM categories 
         WHERE userId = ?`,
            [userId]
        );

        // paginated list
        const [rows] = await pool.query(
            `SELECT *
         FROM categories
         WHERE userId = ?
         ORDER BY createdAt DESC
         LIMIT ? OFFSET ?`,
            [userId, limit, offset]
        );

        return { rows, total: count };
    }
    ,

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
