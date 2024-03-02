import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, DBUri } from "./config.js";
import Recipe from "./models/seedData.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Home page is working");
  res.status(234).send("Welcome to homepage");
});

// Create new Recipe
app.post("/recipes", async (req, res) => {
  try {
    if (!req.body.recipe || !req.body.author) {
      return response.status(400).send({
        message: "Send all required fields: recipe, author",
      });
    }
    const newRecipe = {
      recipe: req.body.recipe,
      author: req.body.author,
    };
    const recipe = await Recipe.create(newRecipe);
    return res.status(201).send(recipe);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Display All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Display Individual Recipe
app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findById(id);
    return res.status(200).json(recipe);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// const seedData = [
//   {
//     name: "Adobo",
//     description:
//       "Filipino dish with marinated meat cooked in vinegar, soy sauce, garlic, and spices for a tangy, savory flavor.",
//     ingredients: [
//       "2 cloves Garlic",
//       "1 tbsp Vinegar",
//       "1 tbsp Soy sauce",
//       "1 kl Pork/Chicken",
//       "2 Bayleaves",
//     ],
//     instructions: [
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1606525575548-2d62ed40291d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRvYm98ZW58MHx8MHx8fDA%3D",
//     serves: 2,
//     cookingTime: {
//       duration: 45,
//       unit: ["min"]
//     },
//     typeOfDish:["Pork", "Poultry"]
//   },
// ];


// Recipe.insertMany(seedData)
//   .then((result) => {
//     console.log(`${result.length} documents inserted successfully`);
//   })
//   .catch((error) => {
//     console.error("Error inserting seed data:", error);
//   });

// Recipe.deleteMany({})
//   .then(() => {
//     console.log('All recipes deleted successfully');
//   })
//   .catch((error) => {
//     console.error('Error deleting recipes:', error);
//   });

mongoose
  .connect(DBUri)
  .then(() => {
    console.log("Appetit DB connected");
    app.listen(PORT, () => {
      console.log(`Appetit is listening to ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });
