import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/motorisation.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new motorisation
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/motorisation: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/motorisation/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an motorisation with id
    router.put("/:id", update);
  
    // Delete an motorisation with id
    router.delete("/:id", deleteById);
  
    // Delete all motorisations
    router.delete("/", deleteAll);
  
    app.use('/api/motorisation', router);
};
