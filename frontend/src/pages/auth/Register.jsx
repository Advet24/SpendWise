import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (res.data.success) {
                toast.success("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Registration failed";
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create your account</h2>
                <p className="register-subtitle">Start tracking your expenses today</p>

                {errorMessage && <p className="error-text">{errorMessage}</p>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Re-enter password"
                            required
                        />
                    </div>

                    <button className="register-button" type="submit">
                        Register
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
