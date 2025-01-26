import { create, findAll, findOne, update, deleteById, deleteAll, findByCategory, findBySubCategory } from "../controllers/piece.controller.js";
import { Router } from "express";

const router = Router();

export default app => {  
    // Create a new piece
    router.post("/", create);

    // Get all pieces or filter by category or sub-category
    router.get("/", (req, res) => {
        const { categorie, sousCategorie } = req.query;

        if (categorie) {
            console.log(`GET /api/piece?categorie=${categorie}: Request received`);
            findByCategory(req, res); // Gestion des pièces par catégorie
        } else if (sousCategorie) {
            console.log(`GET /api/piece?sousCategorie=${sousCategorie}: Request received`);
            findBySubCategory(req, res); // Gestion des pièces par sous-catégorie
        } else {
            console.log("GET /api/piece: Request received");
            findAll(req, res); // Tous les produits
        }
    });

    // Get a piece by ID
    router.get("/:id", (req, res) => {
        console.log(`GET /api/piece/${req.params.id}: Request received`);
        findOne(req, res);
    });

    // Update a piece with ID
    router.put("/:id", update);

    // Delete a piece by ID
    router.delete("/:id", deleteById);

    // Delete all pieces
    router.delete("/", deleteAll);

    app.use('/api/piece', router);
};
