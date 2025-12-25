import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            
            const {token , user} = res.data;

            if (res.data.success) {
                toast.success("Login successful!");


                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/");
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Invalid credentials";
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to continue managing your finances</p>

                {errorMessage && <p className="error-text">{errorMessage}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="login-button" type="submit">
                        Login
                    </button>
                </form>

                <p className="login-footer">
                    Don’t have an account?
                    <Link to="/register"> Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
