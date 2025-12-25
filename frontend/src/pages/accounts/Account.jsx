import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Account.css";

function Account() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const accounts = [
        { id: 1, name: "HDFC Bank", type: "Bank", balance: 25000, date: "12 Jan 2025" },
        { id: 2, name: "Cash Wallet", type: "Cash", balance: 5000, date: "3 Feb 2025" },
    ];

    return (
        <Layout>

            <div className="page-container">

                <div className="page-header">
                    <div>
                        <h2>Accounts</h2>
                        <p className="subtitle">
                            Manage your wallets, bank accounts and UPI balances.
                        </p>
                    </div>

                    <button className="primary-btn" onClick={() => setShowAddModal(true)}>
                        + Add Account
                    </button>
                </div>


                <div className="card">
                    <table className="account-table">
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Type</th>
                                <th>Opening Balance</th>
                                <th>Created On</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {accounts.map(acc => (
                                <tr key={acc.id}>
                                    <td>{acc.name}</td>
                                    <td>{acc.type}</td>
                                    <td>₹{acc.balance}</td>
                                    <td>{acc.date}</td>
                                    <td>
                                        <button
                                            className="link-btn"
                                            onClick={() => {
                                                setSelectedAccount(acc);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="danger-btn"
                                            onClick={() => {
                                                setAccountToDelete(acc);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>


                {showAddModal && (
                    <div className="modal-overlay">
                        <div className="modal">

                            <h3>Add Account</h3>
                            <p className="subtitle">Create a new wallet, bank or UPI account</p>

                            <div className="form-row">
                                <label>Account Name</label>
                                <input type="text" placeholder="e.g. HDFC Salary Account" />
                            </div>

                            <div className="form-row">
                                <label>Account Type</label>
                                <select>
                                    <option>Select Type</option>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                    <option>UPI</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Opening Balance</label>
                                <input type="number" placeholder="Enter amount" />
                            </div>

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>

                                <button className="primary-btn">
                                    Save Account
                                </button>
                            </div>

                        </div>
                    </div>
                )}


                {showEditModal && selectedAccount && (
                    <div className="modal-overlay">
                        <div className="modal">

                            <h3>Edit Account</h3>
                            <p className="subtitle">Update account details</p>

                            <div className="form-row">
                                <label>Account Name</label>
                                <input type="text" defaultValue={selectedAccount.name} />
                            </div>

                            <div className="form-row">
                                <label>Account Type</label>
                                <select defaultValue={selectedAccount.type}>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                    <option>UPI</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Opening Balance</label>
                                <input type="number" defaultValue={selectedAccount.balance} />
                            </div>

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>

                                <button className="primary-btn">
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                )}


                {showDeleteModal && accountToDelete && (
                    <div className="modal-overlay">
                        <div className="modal delete-modal">

                            <h3>Delete Account</h3>
                            <p className="subtitle">
                                Are you sure you want to delete <b>{accountToDelete.name}</b>?
                            </p>

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>

                                <button className="danger-filled-btn">
                                    Yes, Delete
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>

        </Layout>
    );
}

export default Account;
