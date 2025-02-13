import { create, findAll, findByEmail, update, deleteById, deleteAll } from "../controllers/client.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Client
    router.post("/", create);
  
    router.get("/", (req, res) => {
        console.log("GET /api/client: Request received");
        findAll(req, res);
      });
      

      router.post('/login', (req, res) => {
        console.log('POST /api/client/login: Request received');
        const { email, password } = req.body;
        console.log(`email: ${email}, password: ${password}`);
        findByEmail(req, res);
    });    

    // Update an Client with id
    router.put("/:id", update);
  
    // Delete an Client with id
    router.delete("/:id", deleteById);
  
    // Delete all Types
    router.delete("/", deleteAll);
  
    app.use('/api/client', router);
};
