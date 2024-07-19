import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Middleware
import authenticateUser from "./middleware/authentication";
import errorHandlerMiddleware from "./middleware/error-handler";

//Routes
import authRouter from "./routes/auth";
import projectsRouter from "./routes/projects";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/projects", authenticateUser, projectsRouter);
app.use("/api/tasks", authenticateUser, tasksRouter);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
