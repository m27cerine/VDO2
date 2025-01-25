import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/marque.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new marque
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/marque: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/marque/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an marque with id
    router.put("/:id", update);
  
    // Delete an marque with id
    router.delete("/:id", deleteById);
  
    // Delete all marques
    router.delete("/", deleteAll);
  
    app.use('/api/marque', router);
};
