import { TransactionService } from "../service/transaction.service.js";

export const TransactionController = {

  async create(req, res) {
    try {
      const id = await TransactionService.create(req.user.id, req.body);

      res.json({
        success: true,
        message: "Transaction created successfully",
        id
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },


  async getAll(req, res) {
    try {
      const transactions = await TransactionService.getAll(req.user.id);

      res.json({
        success: true,
        data: transactions
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },


  async update(req, res) {
    try {
      const ok = await TransactionService.update(
        req.params.id,
        req.user.id,
        req.body
      );

      if (!ok)
        return res.status(404).json({ success: false, message: "Transaction not found" });

      res.json({ success: true, message: "Transaction updated" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },


  async delete(req, res) {
    try {
      const ok = await TransactionService.delete(
        req.params.id,
        req.user.id
      );

      if (!ok)
        return res.status(404).json({ success: false, message: "Transaction not found" });

      res.json({ success: true, message: "Transaction deleted" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

};
