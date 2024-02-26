import Recipe from "../models/recipe";

// Example controller functions
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createRecipe = async (req, res) => {
  const { title, description, instructions, imageUrl, userId } = req.body;
  try {
    const newRecipe = new Recipe({ title, description, instructions, imageUrl, userId });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  getAllRecipes,
  createRecipe
};
