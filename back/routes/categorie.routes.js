import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/categorie.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new categorie
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/categorie: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/categorie/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an categorie with id
    router.put("/:id", update);
  
    // Delete an categorie with id
    router.delete("/:id", deleteById);
  
    // Delete all categories
    router.delete("/", deleteAll);
  
    app.use('/api/categorie', router);
};
