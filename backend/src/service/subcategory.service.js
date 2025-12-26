import pool from "../config/db.js";

export const SubCategoryService = {


  async getAllSubCategories(userId, limit, offset) {

    // data query
    const [rows] = await pool.query(`
    SELECT 
      s.id,
      s.categoryId,
      s.subCategoryName,
      s.createdAt,
      c.categoryName
    FROM subCategories s
    JOIN categories c ON s.categoryId = c.id
    WHERE c.userId = ?
    LIMIT ? OFFSET ?
  `, [userId, limit, offset]);


    // count query
    const [[{ total }]] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM subCategories s
    JOIN categories c ON s.categoryId = c.id
    WHERE c.userId = ?
  `, [userId]);

    return { rows, total };
  },


  async getByCategory(categoryId, userId) {
    const [rows] = await pool.query(
      `SELECT 
        s.id,
        s.categoryId,
        s.subCategoryName,
        s.createdAt,
        c.categoryName
     FROM subCategories s
     JOIN categories c 
       ON s.categoryId = c.id
     WHERE s.categoryId = ? 
       AND c.userId = ?`,
      [categoryId, userId]
    );
    return rows;
  },

  async create(categoryId, subCategoryName, userId) {
    await pool.query(
      `INSERT INTO subCategories (categoryId, subCategoryName)
       SELECT ?, ? FROM categories WHERE id = ? AND userId = ?`,
      [categoryId, subCategoryName, categoryId, userId]
    );
  },

  async update(id, subCategoryName, userId) {
    await pool.query(
      `UPDATE subCategories s
       JOIN categories c ON s.categoryId = c.id
       SET s.subCategoryName = ?
       WHERE s.id = ? AND c.userId = ?`,
      [subCategoryName, id, userId]
    );
  },

  async delete(id, userId) {
    await pool.query(
      `DELETE s FROM subCategories s
       JOIN categories c ON s.categoryId = c.id
       WHERE s.id = ? AND c.userId = ?`,
      [id, userId]
    );
  }
};
