import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/type.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Type
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/Type: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/Type/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an Type with id
    router.put("/:id", update);
  
    // Delete an Type with id
    router.delete("/:id", deleteById);
  
    // Delete all Types
    router.delete("/", deleteAll);
  
    app.use('/api/Type', router);
};
