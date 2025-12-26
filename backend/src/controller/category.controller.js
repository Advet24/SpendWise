import { CategoryService } from "../service/category.service.js";

export const CategoryController = {

    async list(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;

        const { rows, total } = await CategoryService.getCategories(
            req.user.id,
            page,
            limit
        );

        res.json({
            success: true,
            data: rows,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
,

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