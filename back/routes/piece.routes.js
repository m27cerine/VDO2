import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/piece.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new piece
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/piece: Request received");
        findAll(req, res);
      });
      
      router.get("/:id", (req, res) => {
        console.log(`GET /api/piece/${req.params.id}: Request received`);
        findOne(req, res);
      });      
  
    // Update an piece with id
    router.put("/:id", update);
  
    // Delete an piece with id
    router.delete("/:id", deleteById);
  
    // Delete all pieces
    router.delete("/", deleteAll);
  
    app.use('/api/piece', router);
};
