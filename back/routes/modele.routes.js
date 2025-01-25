import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/modele.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new model
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/modele: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/modele/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an model with id
    router.put("/:id", update);
  
    // Delete an model with id
    router.delete("/:id", deleteById);
  
    // Delete all models
    router.delete("/", deleteAll);
  
    app.use('/api/modele', router);
};
