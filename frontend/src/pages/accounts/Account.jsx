import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import "./Account.css";
import toast from "react-hot-toast";

const URL = "http://localhost:3000/api/accounts/";


function Account() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const [accounts, setAccounts] = useState([]);

    const [accountName, setAccountName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [openingBalance, setOpeningBalance] = useState(0);

    const [editName, setEditName] = useState("");
    const [editType, setEditType] = useState("");
    const [editBalance, setEditBalance] = useState(0);



    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = res.data.accounts;
            console.log("RAW DATA:", data);

            setAccounts(data);

        } catch (error) {
            console.error("Error fetching accounts:", error.response?.data || error.message);
        }
    };


    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    const formatAmount = (value) => {
        if (value == null) return "₹ 0.00";

        return Number(value).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2
        });
    };

    const formatType = (type) => {
        if (!type) return "-";
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    }


    const handleAddAccount = async () => {
        try {
            if (!accountName || !accountType) {
                toast.error("Please fill all fields");
                return;
            }

            const token = localStorage.getItem("token");

            const payload = {
                name: accountName,
                accountType,
                openingBalance: Number(openingBalance)
            };

            const res = await axios.post(URL + "add", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("ACCOUNT CREATED:", res.data);
            toast.success("Account created successfully");

            fetchAccounts();

            setAccountName("");
            setAccountType("");
            setOpeningBalance("");

            setShowAddModal(false);


        } catch (error) {
            console.error("Add Account Failed:", error.response?.data || error.message);
            toast.error("Failed to add account ");
        }
    }


    const handleEditAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("token", token);

            const payload = {
                name: editName,
                accountType: editType,
                openingBalance: Number(editBalance)
            };

            await axios.put(URL + selectedAccount.accountId, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            toast.success("Account updated successfully");

            fetchAccounts();
            setShowEditModal(false);
        } catch (error) {
            console.error("Update failed:", error.response?.data || error.message);
            toast.error("Failed to update account");
        }
    }



    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(URL + accountToDelete.accountId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            toast.success("Account deleted successfully");

            fetchAccounts();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Delete failed:", error.response?.data || error.message);
            toast.error("Failed to delete account");
        }
    }

















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
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {accounts.map(acc => (
                                <tr key={acc.id}>
                                    <td>{acc.name}</td>
                                    <td>{formatType(acc.accountType)}</td>
                                    <td>{formatAmount(acc.openingBalance)}</td>
                                    <td>{formatDate(acc.createdAt)}</td>

                                    <td>
                                        <button
                                            className="link-btn"
                                            onClick={() => {
                                                setSelectedAccount(acc);
                                                setEditName(acc.name);
                                                setEditType(acc.accountType);
                                                setEditBalance(acc.openingBalance);
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


                {/* add account model  */}

                {showAddModal && (
                    <div className="modal-overlay">
                        <div className="modal">

                            <h3>Add Account</h3>
                            <p className="subtitle">Create a new wallet, bank or UPI account</p>

                            <div className="form-row">
                                <label>Account Name</label>
                                <input type="text" placeholder="e.g. HDFC Salary Account" value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)} />
                            </div>

                            <div className="form-row">
                                <label>Account Type</label>
                                <select
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}>
                                    <option>Select Type</option>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                    <option>UPI</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Opening Balance</label>
                                <input type="number" placeholder="Enter amount"
                                    value={openingBalance}
                                    onChange={(e) => setOpeningBalance(e.target.value)} />
                            </div>

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>

                                <button className="primary-btn" onClick={handleAddAccount}>
                                    Save Account
                                </button>
                            </div>

                        </div>
                    </div>
                )}


                {/* edit account modal  */}

                {showEditModal && selectedAccount && (
                    <div className="modal-overlay">
                        <div className="modal">

                            <h3>Edit Account</h3>
                            <p className="subtitle">Update account details</p>

                            <div className="form-row">
                                <label>Account Name</label>
                                <input type="text" value={editName}
                                    onChange={(e) => setEditName(e.target.value)} />
                            </div>

                            <div className="form-row">
                                <label>Account Type</label>
                                <select value={editType}
                                    onChange={(e) => setEditType(e.target.value)}>
                                    <option>Select Type</option>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                    <option>UPI</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Opening Balance</label>
                                <input type="number" value={editBalance}
                                    onChange={(e) => setEditBalance(e.target.value)} />
                            </div>


                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>

                                <button className="primary-btn" onClick={handleEditAccount}>
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                )}


                {/* delete account modal   */}

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

                                <button className="danger-filled-btn" onClick={handleDeleteAccount}>
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
