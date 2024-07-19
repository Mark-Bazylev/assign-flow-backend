import express from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks";

const router = express.Router();

router.route("/getAllTasks").get(getAllTasks);
router.route("/getTask/:id").get(getTask);
router.route("/createTask").post(createTask);
router.route("/updateTask/:id").patch(updateTask);
router.route("/deleteTask/:id").delete(deleteTask);

export default router;
