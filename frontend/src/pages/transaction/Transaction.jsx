import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Transaction.css";

function Transaction() {

  const transactions = [
    { id: 1, date: "12 Jan 2025", type: "Expense", category: "Food", account: "HDFC Bank", amount: -450, note: "Lunch" },
    { id: 2, date: "15 Jan 2025", type: "Income", category: "Salary", account: "HDFC Bank", amount: 50000, note: "Monthly Salary" },
    { id: 3, date: "18 Jan 2025", type: "Expense", category: "Shopping", account: "Cash Wallet", amount: -1200, note: "Groceries" }
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const handleDeleteClick = (txn) => {
    setSelectedTxn(txn);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Delete transaction:", selectedTxn);
    setShowDeleteModal(false);
  };

  return (
    <Layout>

      <div className="txn-container">

        <div className="txn-header">
          <div>
            <h2>Transactions</h2>
            <p className="subtitle">
              View and manage all your income & expense records.
            </p>
          </div>
        </div>


        <div className="card">

          <table className="txn-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Note</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td>{txn.date}</td>

                  <td className={txn.type === "Income" ? "green" : "red"}>
                    {txn.type}
                  </td>

                  <td>{txn.category}</td>
                  <td>{txn.account}</td>

                  <td className={txn.amount > 0 ? "green" : "red"}>
                    ₹{txn.amount}
                  </td>

                  <td>{txn.note}</td>

                  <td>
                    <button className="link-btn">Edit</button>

                    <button
                      className="danger-btn"
                      onClick={() => handleDeleteClick(txn)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>


        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">

              <h3>Delete Transaction?</h3>

              <p>
                Are you sure you want to delete  
                <strong> #{selectedTxn.id}</strong> —  
                <strong> {selectedTxn.note}</strong> ?
              </p>

              <div className="modal-actions">
                <button
                  className="cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="delete"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </Layout>
  );
}

export default Transaction;
