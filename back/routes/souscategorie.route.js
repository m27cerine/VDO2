// souscategorie.route.js
import { create, findAll, findOne, update, deleteById, deleteAll, findByCategorie } from "../controllers/souscategorie.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
    // Create a new souscategorie
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/souscategorie: Request received");
        findAll(req, res);
    });
      
    router.get("/:id", (req, res) => {
        console.log(`GET /api/souscategorie/${req.params.id}: Request received`);
        findOne(req, res);
    });    
      
    router.get("/categorie/:categorieId", (req, res) => {
        console.log(`GET /api/souscategorie/categorie/${req.params.categorieId}: Request received`);
        findByCategorie(req, res);
    });

    // Update a souscategorie with id
    router.put("/:id", update);
  
    // Delete a souscategorie with id
    router.delete("/:id", deleteById);
  
    // Delete all souscategories
    router.delete("/", deleteAll);
  
    app.use('/api/souscategorie', router);
};
