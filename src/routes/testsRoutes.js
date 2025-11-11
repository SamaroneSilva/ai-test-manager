import express from "express";
import { getAllTests, createTest } from "../controllers/testController.js";

const router = express.Router();

router.get("/", getAllTests);
router.post("/", createTest);

export default router;
