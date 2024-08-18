import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

// Connect to MongoDB
try {
    mongoose.connect(process.env.MongoDB_URI).then(console.log("MongoDB connected"))
} catch (error) {
    console.log("Error in connecting to MongoDB");
    console.log(error);
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;