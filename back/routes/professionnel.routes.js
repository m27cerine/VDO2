import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/professionnel.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
  
    // Create a new Professionnel
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/professionnel: Request received");
        findAll(req, res);
    });
      
    router.get("/:id", (req, res) => {
        console.log(`GET /api/professionnel/${req.params.id}: Request received`);
        findOne(req, res);
    });      
  
    // Update a Professionnel with id
    router.put("/:id", update);
  
    // Delete a Professionnel with id
    router.delete("/:id", deleteById);
  
    // Delete all Professionnels
    router.delete("/", deleteAll);
  
    app.use('/api/professionnel', router);
};
