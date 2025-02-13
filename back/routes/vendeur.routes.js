import { create, findAll, findOne,findByEmail, update, deleteById, deleteAll } from "../controllers/vendeur.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
  
    // Create a new Vendeur
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/vendeur: Request received");
        findAll(req, res);
    });
      
          router.post('/login', (req, res) => {
            console.log('POST /api/vendeur/login: Request received');
            const { email, password } = req.body;
            console.log(`email: ${email}, password: ${password}`);
            findByEmail(req, res);
        });    


    router.get("/:id", (req, res) => {
        console.log(`GET /api/vendeur/${req.params.id}: Request received`);
        findOne(req, res);
    });      
  
    // Update a Vendeur with id
    router.put("/:id", update);
  
    // Delete a Vendeur with id
    router.delete("/:id", deleteById);
  
    // Delete all Vendeurs
    router.delete("/", deleteAll);
  
    app.use('/api/vendeur', router);
};
