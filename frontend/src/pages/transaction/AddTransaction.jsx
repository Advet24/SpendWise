import React from "react";
import Layout from "../../components/layout/Layout";
import "../transaction/addTransaction.css";

function AddTransaction() {
    return (
        <Layout>
            <div className="add-container">

                <h2>Add Transaction</h2>
                <p className="subtitle">Record a new income or expense entry.</p>
                <div className="add-card">

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select></select>
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select></select>
                        </div>

                        <div className="form-group">
                            <label>Sub Category</label>
                            <select></select>
                        </div>

                        <div className="form-group">
                            <label>Account</label>
                            <select></select>
                        </div>

                        <div className="form-group">
                            <label>Amount</label>
                            <input />
                        </div>

                        <div className="form-group full">
                            <label>Description</label>
                            <textarea />
                        </div>

                    </div>

                    <div className="btn-row">
                        <button className="cancel">Cancel</button>
                        <button className="save">Save Transaction</button>
                    </div>

                </div>


            </div>
        </Layout>
    );
}

export default AddTransaction;
