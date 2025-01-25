import { create, findAll, findOne, update, deleteById, deleteAll, findByTypeAndMarque } from "../controllers/modele.controller.js";
import { Router } from "express";

const router = Router();

export default (app) => {
  // Create a new model
  router.post("/", create);

  // Retrieve all models
  router.get("/", (req, res) => {
    console.log("GET /api/modele: Request received");
    findAll(req, res);
  });

  // Retrieve a single model by ID
  router.get("/:id", (req, res) => {
    console.log(`GET /api/modele/${req.params.id}: Request received`);
    findOne(req, res);
  });

  // Retrieve models by marque and type
  router.get("/type/:id_type/marque/:id_marque", (req, res) => {
    console.log(
      `GET /api/modele/type/${req.params.id_type}/marque/${req.params.id_marque}: Request received`
    );
    findByTypeAndMarque(req, res);
  });

  // Update a model by ID
  router.put("/:id", update);

  // Delete a model by ID
  router.delete("/:id", deleteById);

  // Delete all models
  router.delete("/", deleteAll);

  app.use("/api/modele", router);
};
