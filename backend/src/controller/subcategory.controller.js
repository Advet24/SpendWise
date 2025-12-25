import { SubCategoryService } from "../service/subcategory.service.js";

export const SubCategoryController = {

  async getByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const userId = req.user.id;

      const data = await SubCategoryService.getByCategory(categoryId, userId);

      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { categoryId, subCategoryName } = req.body;
      const userId = req.user.id;

      await SubCategoryService.create(categoryId, subCategoryName, userId);

      res.json({ success: true, message: "Sub category created" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { subCategoryName } = req.body;
      const userId = req.user.id;

      await SubCategoryService.update(id, subCategoryName, userId);

      res.json({ success: true, message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await SubCategoryService.delete(id, userId);

      res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
