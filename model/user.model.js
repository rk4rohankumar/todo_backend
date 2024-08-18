import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

// Connect to MongoDB
// try {
//     mongoose.connect(process.env.MongoDB_URI).then(console.log("MongoDB connected"))
// } catch (error) {
//     console.log("Error in connecting to MongoDB");
//     console.log(error);
// }

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        required: false,
    }]
});




const User = mongoose.model("User", userSchema);

export default User;