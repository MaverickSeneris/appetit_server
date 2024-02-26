import express from "express";
import { getAllRecipes, createRecipe } from "../controllers/recipeController";

const router = express.Router();

// Routes for recipes
router.get("/", getAllRecipes);
router.post("/", createRecipe);

export default router;
