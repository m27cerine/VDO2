import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/client.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Client
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/client: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/client/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an Client with id
    router.put("/:id", update);
  
    // Delete an Client with id
    router.delete("/:id", deleteById);
  
    // Delete all Types
    router.delete("/", deleteAll);
  
    app.use('/api/client', router);
};
