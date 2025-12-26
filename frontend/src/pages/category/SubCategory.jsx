import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./SubCategory.css";
import toast from "react-hot-toast";
import axios from "axios";

const API = "http://localhost:3000/api/subcategories/";
const CAT_URL = "http://localhost:3000/api/categories/";

function SubCategory() {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const [newSubCatName, setNewSubCatName] = useState("");
    const [addCategoryId, setAddCategoryId] = useState("");

    const [editSubCatName, setEditSubCatName] = useState("");

    // pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 4;


    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        if (selectedCategoryId)
            fetchSubCategories(selectedCategoryId);
        else
            getAllSubCategories();
    }, [page]);



    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }


    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(CAT_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCategories(res.data.data || []);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load categories");
        }
    };


    const getAllSubCategories = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${API}?page=${page}&limit=${limit}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("sdjhsdjhs", res.data.data);

            setSubCategories(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            console.error(error);
            toast.error("Failed to load sub-categories");
        }
    };


    const fetchSubCategories = async (categoryId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(API + categoryId, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSubCategories(res.data.data);
            setTotalPages(1);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load sub categories");
        }
    };


    const handleCategorySelect = (id) => {
        setSelectedCategoryId(id);
        setPage(1);

        if (id)
            fetchSubCategories(id);
        else
            getAllSubCategories();
    };


    const handleAdd = async () => {
        try {
            if (!addCategoryId || !newSubCatName.trim()) {
                toast.error("Please fill in all fields");
                return;
            }

            const token = localStorage.getItem("token");

            await axios.post(API, {
                categoryId: addCategoryId,
                subCategoryName: newSubCatName
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Sub-category added");
            setShowAdd(false);
            setNewSubCatName("");
            setAddCategoryId("");

            if (selectedCategoryId)
                fetchSubCategories(selectedCategoryId);
            else
                getAllSubCategories();

        } catch (err) {
            console.error(err);
            toast.error("Failed to add sub-category");
        }
    };


    const handleEdit = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(API + selectedSubCategory.id, {
                subCategoryName: editSubCatName
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Updated successfully");
            setShowEdit(false);

            if (selectedCategoryId)
                fetchSubCategories(selectedCategoryId);
            else
                getAllSubCategories();

        } catch (err) {
            console.error(err);
            toast.error("Failed to update sub-category");
        }
    };


    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(API + selectedSubCategory.id, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Deleted successfully");
            setShowDelete(false);

            if (selectedCategoryId)
                fetchSubCategories(selectedCategoryId);
            else
                getAllSubCategories();

        } catch (err) {
            console.error(err);
            toast.error("Failed to delete sub-category");
        }
    };


    return (
        <Layout>

            <div className="subcat-container">

                <div className="subcat-header">
                    <div>
                        <h2>Sub-Categories</h2>
                        <p className="subtitle">
                            Group transactions into detailed categories.
                        </p>
                    </div>

                    <button
                        className="primary-btn"
                        onClick={() => setShowAdd(true)}
                    >
                        + Add Sub-Category
                    </button>
                </div>


                <select
                    value={selectedCategoryId}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                >
                    <option value="">All Categories</option>

                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.categoryName}
                        </option>
                    ))}
                </select>


                <div className="subcat-card">

                    <table className="subcat-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Parent Category</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {Array.isArray(subCategories) && subCategories.map(sub => (
                                <tr key={sub.id}>
                                    <td>{sub.subCategoryName}</td>
                                    <td>{sub.categoryName}</td>
                                    <td>{formatDate(sub.createdAt)}</td>
                                    <td>
                                        <button
                                            className="link-btn"
                                            onClick={() => {
                                                setSelectedSubCategory(sub);
                                                setEditSubCatName(sub.subCategoryName);
                                                setShowEdit(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="danger-btn"
                                            onClick={() => {
                                                setSelectedSubCategory(sub);
                                                setShowDelete(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {subCategories.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ color: "gray" }}>
                                        No sub-categories found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>


                {!selectedCategoryId && (
                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </button>

                        <span>{page} / {totalPages}</span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>



            {showAdd && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Add Sub-Category</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={newSubCatName}
                                onChange={e => setNewSubCatName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={addCategoryId}
                                onChange={e => setAddCategoryId(e.target.value)}
                            >
                                <option value="">Select Category</option>

                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowAdd(false)}>
                                Cancel
                            </button>
                            <button className="save" onClick={handleAdd}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}



            {showEdit && selectedSubCategory && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Edit Sub-Category</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={editSubCatName}
                                onChange={e => setEditSubCatName(e.target.value)}
                            />
                        </div>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowEdit(false)}>
                                Cancel
                            </button>
                            <button className="save" onClick={handleEdit}>
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            )}



            {showDelete && selectedSubCategory && (
                <div className="modal-overlay">
                    <div className="modal small">

                        <h3>Delete Sub-Category?</h3>
                        <p>
                            Are you sure you want to delete
                            <b> {selectedSubCategory.subCategoryName}</b>?
                        </p>

                        <div className="btn-row">
                            <button className="cancel" onClick={() => setShowDelete(false)}>
                                Cancel
                            </button>
                            <button className="danger-modal-btn" onClick={handleDelete}>
                                Yes, Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </Layout>
    );
}

export default SubCategory;
