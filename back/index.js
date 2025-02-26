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

import categorieRoute from "./routes/categorie.routes.js";
categorieRoute(app);

import pieceRoute from "./routes/piece.routes.js";
pieceRoute(app);

import souscategorieRoute from "./routes/souscategorie.route.js"
souscategorieRoute(app);

import client from "./routes/client.routes.js"
client(app);

import professionnel from "./routes/professionnel.routes.js"
professionnel(app);

import wilaya from "./routes/wilaya.routes.js"
wilaya(app);

import commune from "./routes/commune.routes.js"
commune(app);

import vendeur from "./routes/vendeur.routes.js"
vendeur(app);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });