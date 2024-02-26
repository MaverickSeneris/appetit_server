import dotenv from 'dotenv';
dotenv.config();
const port = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


export const PORT = port
export const DBUri = `mongodb+srv://${dbUser}:${dbPassword}@appetit.z9y3v6m.mongodb.net/recipes-collection?retryWrites=true&w=majority&appName=Appetit`
