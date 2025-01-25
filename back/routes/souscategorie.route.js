import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/souscategorie.controller.js";
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
  
    // Update an souscategorie with id
    router.put("/:id", update);
  
    // Delete an souscategorie with id
    router.delete("/:id", deleteById);
  
    // Delete all souscategories
    router.delete("/", deleteAll);
  
    app.use('/api/souscategorie', router);
};
