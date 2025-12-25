import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./SubCategory.css";
import toast from "react-hot-toast";
import axios from "axios";

const API = "http://localhost:3000/api/subcategories/";

function SubCategory() {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState("");


    // Load categories from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("categories");
        if (stored) {
            setCategories(JSON.parse(stored));
        }
    }, []);


    // Fetch sub-categories for selected category
    const fetchSubCategories = async (categoryId) => {
        if (!categoryId) return;

        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(API + categoryId, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSubCategories(res.data);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load sub categories");
        }
    };


    // When user selects category
    const handleCategorySelect = (id) => {
        setSelectedCategoryId(id);
        fetchSubCategories(id);
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
                </div>


                {/* CATEGORY DROPDOWN */}
                <select
                    value={selectedCategoryId}
                    onChange={e => handleCategorySelect(e.target.value)}
                >
                    <option value="">Select Category</option>

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
                            </tr>
                        </thead>

                        <tbody>

                            {subCategories.map(sub => (
                                <tr key={sub.id}>
                                    <td>{sub.subCategoryName}</td>
                                    <td>{sub.categoryName}</td>
                                </tr>
                            ))}

                            {subCategories.length === 0 && selectedCategoryId && (
                                <tr>
                                    <td colSpan="2" style={{ color: "gray" }}>
                                        No sub-categories found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default SubCategory;
