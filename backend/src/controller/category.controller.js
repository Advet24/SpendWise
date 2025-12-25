import { CategoryService } from "../service/category.service.js";

export const CategoryController = {

    async list(req, res) {
        const data = await CategoryService.getCategories(req.user.id);
        res.json(data);
    },

    async create(req, res) {
        const { categoryName, categoryType } = req.body;

        const id = await CategoryService.createCategory(
            req.user.id,
            categoryName,
            categoryType
        );

        res.json({ id });
    },

    async update(req, res) {
        const success = await CategoryService.updateCategory(
            req.params.id,
            req.user.id,
            req.body.categoryName,
            req.body.categoryType
        );

        res.json({ success });
    },

    async remove(req, res) {
        const success = await CategoryService.deleteCategory(
            req.params.id,
            req.user.id
        );
        res.json({ success });
    }
}