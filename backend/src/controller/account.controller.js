import { AccountService } from "../service/account.service.js";

export const AccountController = {

    async createAccount(req, res) {
        try {
            const userId = req.user.id;
            const { name, accountType, openingBalance } = req.body;

            if (!name || !accountType || openingBalance == null) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const accountId = await AccountService.addAccount(
                userId,
                name,
                accountType,
                openingBalance
            );

            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                accountId
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async getAllAccount(req, res) {
        try {
            const userId = req.user.id;
            const accounts = await AccountService.getAccounts(userId);
            return res.status(200).json({
                success: true,
                accounts
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },

    async getAccountById(req, res) {
        try {
            const userId = req.user.id;
            const accountId = req.params.id;
            const account = await AccountService.getAccountById(accountId, userId);

            if (!account) {
                return res.status(404).json({ success: false, message: "Account not found" });
            }

            return res.status(200).json({
                success: true,
                account
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async updateAccount(req, res) {
        try {
            const userId = req.user.id;
            const accountId = req.params.id;
            const { name, accountType, openingBalance } = req.body;
            const isUpdated = await AccountService.updateAccount(
                accountId,
                userId,
                name,
                accountType,
                openingBalance
            );

            if (!isUpdated) {
                return res.status(404).json({ success: false, message: "Account not found or no changes made" });
            }
            return res.status(200).json({
                success: true,
                message: "Account updated successfully"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async deleteAccount(req, res) {
        try {
            const userId = req.user.id;
            const accountId = req.params.id;
            const isDeleted = await AccountService.deleteAccount(accountId, userId);
            if (!isDeleted) {
                return res.status(404).json({ success: false, message: "Account not found" });
            }
            return res.status(200).json({
                success: true,
                message: "Account deleted successfully"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

}