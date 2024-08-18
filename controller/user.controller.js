import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import zod from "zod";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    const schema = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        password: zod.string(),
    });
    
    try {
        const zodverification = schema.safeParse({ name, email, password });
        if (!zodverification.success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user with the hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ "error in user creation": error });
    }
}


const Signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token);
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ "error in user signin": error });
    }
}

export { Signup, Signin };