import express from "express";
import {createTodo,fetchAllTodo,updateTodo,fetchTodoById,deleteTodo,fetchUserTodo} from "../controller/todo.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router.post("/create",userMiddleware,createTodo);
router.get("/todo",fetchAllTodo);
router.get("/todo/:id", userMiddleware,fetchTodoById);
router.put("/update/:id", userMiddleware,updateTodo);
router.delete("/delete/:id",userMiddleware,deleteTodo);
router.get("/user/",userMiddleware,fetchUserTodo);

export default router;