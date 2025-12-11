import { UserService } from "../service/user.service.js";

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmail = await UserService.getUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = await UserService.createUser(name, email, password);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const getAllUser = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json({
            success: true,
            users: users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getByEmail = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await UserService.getUserByEmail(userEmail);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}