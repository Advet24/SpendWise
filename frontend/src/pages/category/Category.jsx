import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import "./Category.css";
import toast from "react-hot-toast";

const CAT_URL = "http://localhost:3000/api/categories/";


function Category() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selected, setSelected] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("");

    const [editCategoryName, setEditCategoryName] = useState("");
    const [editCategoryType, setEditCategoryType] = useState("");


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(CAT_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem("categories", JSON.stringify(res.data));

            console.log("response", res);
            const data = res.data;

            console.log("raw data", data);

            setCategories(data);

        } catch (err) {
            console.error(err);
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


    const handleAddCategory = async () => {
        try {

            if (!categoryName || !categoryType) {
                toast.error("Please fill in all fields");
                return;
            }
            const token = localStorage.getItem("token");

            const payload = {
                categoryName,
                categoryType
            };
            console.log("Payload:", payload);

            await axios.post(CAT_URL + "add", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("Category added successfully");
            toast.success("Category added successfully");
            fetchCategories();
            setShowAdd(false);

        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category");

        }
    }


    const handleEditCategory = async () => {
        try {
            const token = localStorage.getItem("token");

            const payload = {
                categoryName: editCategoryName,
                categoryType: editCategoryType
            };

            await axios.put(CAT_URL + selected.id, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            toast.success("Category updated successfully");
            fetchCategories();
            setShowEdit(false);

        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Failed to update category");

        }
    }


    const handleDeleteCategory = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(CAT_URL + categoryToDelete.id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            toast.success("Category deleted successfully");
            fetchCategories();
            setShowDelete(false);

        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category");
        }
    }












    return (
        <Layout>

            <div className="cat-container">

                <div className="cat-header">
                    <div>
                        <h2>Categories</h2>
                        <p className="subtitle">
                            Organize income and expenses into meaningful groups.
                        </p>
                    </div>

                    <button className="primary-btn" onClick={() => setShowAdd(true)}>
                        + Add Category
                    </button>
                </div>

                <div className="cat-card">

                    <table className="cat-table">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td>{cat.categoryName}</td>
                                    <td className={cat.categoryType === "INCOME" ? "green" : "red"}>
                                        {cat.categoryType}
                                    </td>
                                    <td>{formatDate(cat.createdAt)}</td>
                                    <td>
                                        <button className="link-btn"
                                            onClick={() => {
                                                setSelected(cat);
                                                setEditCategoryName(cat.categoryName);
                                                setEditCategoryType(cat.categoryType);
                                                setShowEdit(true);
                                            }}>Edit</button>
                                        <button className="danger-btn" onClick={() => {
                                            setCategoryToDelete(cat);
                                            setShowDelete(true);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ADD MODAL */}
            {showAdd && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Add Category</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                placeholder="Travel.."
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select
                                value={categoryType}
                                onChange={e => setCategoryType(e.target.value)}
                            >
                                <option value="INCOME">Income</option>
                                <option value="EXPENSE">Expense</option>
                            </select>
                        </div>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowAdd(false)}>Cancel</button>
                            <button className="save" onClick={handleAddCategory}>Save</button>
                        </div>

                    </div>
                </div>
            )}


            {/* EDIT MODAL */}
            {showEdit && selected && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Edit Category</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input value={editCategoryName}
                                onChange={e => setEditCategoryName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select value={editCategoryType} onChange={e => setEditCategoryType(e.target.value)}>
                                <option value="INCOME">Income</option>
                                <option value="EXPENSE">Expense</option>
                            </select>
                        </div>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowEdit(false)}>Cancel</button>
                            <button className="save" onClick={handleEditCategory}>Update</button>
                        </div>

                    </div>
                </div>
            )}


            {/* DELETE CONFIRM */}
            {showDelete && categoryToDelete && (
                <div className="modal-overlay">
                    <div className="modal small">

                        <h3>Delete Category?</h3>
                        <p>
                            Are you sure you want to delete
                            <b> {categoryToDelete.categoryName}</b>?
                        </p>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowDelete(false)}>
                                Cancel
                            </button>
                            <button className="danger-modal-btn" onClick={handleDeleteCategory}>
                                Yes, Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </Layout>
    );
}

export default Category;
