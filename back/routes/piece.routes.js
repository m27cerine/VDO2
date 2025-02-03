import { 
    create, 
    findAll, 
    findOne, 
    update, 
    deleteById, 
    deleteAll, 
    findByCategory, 
    findBySubCategory, 
    findBySubCategoryAndMotorisation 
} from "../controllers/piece.controller.js";
import { Router } from "express";

const router = Router();

export default app => {  
    // Create a new piece
    router.post("/", create);

    // Get all pieces or filter by category, sub-category, or motorisation
    router.get("/", (req, res) => {
        const { categorie, sousCategorie, motorisation } = req.query;

        if (categorie) {
            console.log(`GET /api/piece?categorie=${categorie}: Request received`);
            findByCategory(req, res);
        } else if (sousCategorie && motorisation) {
            console.log(`GET /api/piece?sousCategorie=${sousCategorie}&motorisation=${motorisation}: Request received`);
            findBySubCategoryAndMotorisation(req, res); // Nouvelle gestion
        } else if (sousCategorie) {
            console.log(`GET /api/piece?sousCategorie=${sousCategorie}: Request received`);
            findBySubCategory(req, res);
        } else {
            console.log("GET /api/piece: Request received");
            findAll(req, res);
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
