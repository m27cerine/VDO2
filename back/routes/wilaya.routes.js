import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/wilaya.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  

    // Create a new Wilaya
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/Wilaya: Request received");
        findAll(req, res);
    });
      
    router.get("/:id", (req, res) => {
        console.log(`GET /api/Wilaya/${req.params.id}: Request received`);
        findOne(req, res);
    });      

    // Update a Wilaya with id
    router.put("/:id", update);

    // Delete a Wilaya with id
    router.delete("/:id", deleteById);

    // Delete all Wilayas
    router.delete("/", deleteAll);

    app.use('/api/wilaya', router);
};
