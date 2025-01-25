import  express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'app de gestion des pieces detachées !");
})

import typeRoute from "./routes/type.routes.js";
typeRoute(app);

import marqueRoute from "./routes/marque.routes.js";
marqueRoute(app);

import modelRoute from "./routes/modele.routes.js";
modelRoute(app);

import motorisationRoute from "./routes/motorisation.routes.js";
motorisationRoute(app);


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });