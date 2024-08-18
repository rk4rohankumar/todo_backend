import Todo from "../model/todo.model.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const createTodo = async (req, res) => {
    const { title, completed, description } = req.body;
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1]).id;
        await Todo.create({
            title,
            completed,
            description,
            user: id
        }).then((todo) => {
            User.findByIdAndUpdate(id, {
                "$push": {
                    todos: todo._id
                }
            }).then(() => {
                return res.status(200).json({ "todo created successfully": todo });
            });
        })
    } catch (error) {
        res.status(500).json({ "error in todo creation": error });
    }
};

const fetchAllTodo = async (req, res) => {
    try {
        await Todo.find({}).then((todos) => {
            return res.status(200).json(todos);
        });
    } catch (error) {
        res.status(500).json({ "error in reading todo": error });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed, description } = req.body;
    try {
        await Todo.findByIdAndUpdate(id, {
            title,
            completed,
            description,
        }).then((todo) => {
            return res.status(200).json(todo);
        });
    } catch (error) {
        res.status(500).json({ "error in updating todo": error });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id).then((todo) => {
            return res.status(200).json("deleted successfully");
        });
    } catch (error) {
        res.status(500).json({ "error in deleting todo": error });
    }
}

const fetchTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findById(id).then((todo) => {
            User.findById(todo.user).then((user) => {
                return res.status(200).json({ todo: todo, user: user });
            });
        });
    }
    catch (error) {
        res.status(500).json({ "error in reading todo": error });
    }
}

const fetchUserTodo = async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1]).id;
        const user = await User.findById(id).populate("todos");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user.todos);
    } catch (error) {
        res.status(500).json({ "error in reading user todo": error });
    }
}


export { createTodo, fetchAllTodo, updateTodo, deleteTodo, fetchTodoById, fetchUserTodo };