import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import { getCategories } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

export default router;
