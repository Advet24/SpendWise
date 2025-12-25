import pool from '../config/db.js';

export const AccountService = {

    async addAccount(userId, name, accountType, openingBalance) {
        const [result] = await pool.query(
            `INSERT INTO accounts (userId, name, accountType, openingBalance)
             VALUES (?, ?, ?, ?)`,
            [userId, name, accountType, openingBalance]
        );
        return result.insertId;
    },

    async getAccounts(userId) {
        const [rows] = await pool.query(
            `SELECT * FROM accounts 
            WHERE userId = ?
             ORDER BY createdAt DESC`,
            [userId]
        );
        return rows;
    },

    async getAccountById(accountId, userId) {
        const [rows] = await pool.query(
            `SELECT * FROM accounts 
            WHERE accountId  = ? AND userId = ?`,
            [accountId, userId]
        );
        return rows[0];
    },

    async updateAccount(accountId, userId, name, accountType, openingBalance) {
        const [result] = await pool.query(
            `UPDATE accounts 
            SET name = ?, accountType = ?, openingBalance = ?
            WHERE accountId = ? AND userId = ?`,
            [name, accountType, openingBalance, accountId, userId]
        );
        return result.affectedRows > 0;
    },

    async deleteAccount(accountId, userId) {
        const [result] = await pool.query(
            `DELETE FROM accounts 
            WHERE accountId = ? AND userId = ?`,
            [accountId, userId]
        );
        return result.affectedRows > 0;
    }

}