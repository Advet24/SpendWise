import pool from "../config/db.js";

export const TransactionService = {

  async create(userId, data) {

    const {
      type,
      categoryId,
      subCategoryId,
      accountId,
      amount,
      description,
      txnDate
    } = data;

    const [result] = await pool.query(
      `INSERT INTO transactions 
      (userId, type, categoryId, subCategoryId, accountId, amount, description, txnDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        type,
        categoryId,
        subCategoryId || null,
        accountId,
        amount,
        description || null,
        txnDate
      ]
    );

    return result.insertId;
  },


  async getAll(userId) {

    const [rows] = await pool.query(
      `SELECT 
          t.*, 
          c.categoryName,
          s.subCategoryName,
          a.name AS accountName
       FROM transactions t
       JOIN categories c ON t.categoryId = c.id
       LEFT JOIN subCategories s ON t.subCategoryId = s.id
       JOIN accounts a ON t.accountId = a.accountId
       WHERE t.userId = ?
       ORDER BY t.txnDate DESC`,
      [userId]
    );

    return rows;
  },


  async getById(id, userId) {

    const [rows] = await pool.query(
      `SELECT * FROM transactions 
       WHERE id = ? AND userId = ?`,
      [id, userId]
    );

    return rows[0];
  },


  async update(id, userId, data) {

    const {
      type,
      categoryId,
      subCategoryId,
      accountId,
      amount,
      description,
      txnDate
    } = data;

    const [result] = await pool.query(
      `UPDATE transactions
       SET type = ?, categoryId = ?, subCategoryId = ?, 
           accountId = ?, amount = ?, description = ?, txnDate = ?
       WHERE id = ? AND userId = ?`,
      [
        type,
        categoryId,
        subCategoryId || null,
        accountId,
        amount,
        description || null,
        txnDate,
        id,
        userId
      ]
    );

    return result.affectedRows > 0;
  },


  async delete(id, userId) {

    const [result] = await pool.query(
      `DELETE FROM transactions 
       WHERE id = ? AND userId = ?`,
      [id, userId]
    );

    return result.affectedRows > 0;
  }

};
