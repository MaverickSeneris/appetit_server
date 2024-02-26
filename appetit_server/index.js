import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors"
import { PORT, DBUri } from "./config.js";
import Recipe from "./models/testModel.js";

const app = express();

app.use(express.json())
app.use(cors())

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
    return res.status(201).send(recipe)
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Display Recipe
app.get('/recipes', async (req, res)=>{
  try {
    const recipes = await Recipe.find({})
    return res.status(200).json(recipes)
  } catch (err) {
    console.log(err.message)
    response.status(500).send({message: err.message})
  }
})

// const seedData = [
//   { recipe: 'Adobo', author:"Maverick Seneris", image:"https://images.unsplash.com/photo-1606525575548-2d62ed40291d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRvYm98ZW58MHx8MHx8fDA%3D", },
//   { recipe: 'Kare kare', author: "Jho Seneris", image:"https://assets.unileversolutions.com/v1/85775930.jpg?im=AspectCrop=(1440,600);Resize=(1440,600)", },
//   { recipe: 'Ily\'s Scramble Egg', author: "Ily Seneris", image:"https://images.unsplash.com/photo-1563690449029-d6e1b8d6003d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NyYW1ibGVkJTIwZWdnc3xlbnwwfHwwfHx8MA%3D%3D", },
// ];

// // Insert seed data into the database
// Recipe.insertMany(seedData)
//   .then((result) => {
//     console.log(`${result.length} documents inserted successfully`);
//   })
//   .catch((error) => {
//     console.error('Error inserting seed data:', error);
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
