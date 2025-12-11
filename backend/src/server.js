import app from './app.js';
import dotenv from 'dotenv';
import pool from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

if (!pool) {
    console.error("Database connection failed");
} else {
    console.log("Database connected successfully");
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});