import express from 'express';
import todo from './routes/todo.js';
import user from './routes/user.js';

const app = express();

app.use(express.json());
app.use("/", todo);
app.use("/", user);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});