import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/commune.controller.js";
import { findByWilaya } from "../controllers/commune.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new commune
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/commune: Request received");
        findAll(req, res);
    });
      
    router.get("/:id", (req, res) => {
        console.log(`GET /api/commune/${req.params.id}: Request received`);
        findOne(req, res);
    });      
  
    router.get("/wilaya/:wilayaId", (req, res) => {
        console.log(`GET /api/commune/wilaya/${req.params.wilayaId}: Request received`);
        findByWilaya(req, res);
    });

    // Update a commune with id
    router.put("/:id", update);
  
    // Delete a commune with id
    router.delete("/:id", deleteById);
  
    // Delete all communes
    router.delete("/", deleteAll);
  
    app.use('/api/commune', router);
};
