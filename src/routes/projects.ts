import express from "express";
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects";

const router = express.Router();

router.route("/getAllProjects").get(getAllProjects);
router.route("/getProject/:id").get(getProject);
router.route("/createProject").post(createProject);
router.route("/updateProject/:id").patch(updateProject);
router.route("/deleteProject/:id").delete(deleteProject);

export default router;
