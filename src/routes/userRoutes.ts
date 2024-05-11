import express from "express";
import { getAllUsers, getUserById, getUserRepos } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:username/details", getUserById);

router.get("/:username/repos", getUserRepos);

export default router;

