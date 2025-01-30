import souscategorie from "../models/souscategorie.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const souscategorie = new souscategorie({
        nomsouscategorie: req.body.nomsouscategorie
    });

    souscategorie.create(souscategorie, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the souscategorie."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("souscategorie.controller.js: findAll called");
  
    const nom = req.query.nomsouscategorie;
    console.log(`souscategorie.controller.js: Query parameter nomsouscategorie = ${nom}`);
  
    souscategorie.getAll(nom, (err, data) => {
      if (err) {
        console.error("souscategorie.controller.js: Error retrieving souscategories:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving souscategories.",
        });
      } else {
        console.log("souscategorie.controller.js: souscategories retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    souscategorie.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found souscategorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving souscategorie with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    souscategorie.updateById(
        req.params.id,
        new souscategorie(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found souscategorie with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating souscategorie with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const findByCategorie = (req, res) => {
    const { categorieId } = req.params;
  
    souscategorie.findByCategorieId(categorieId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Motorisations not found for categorieId ${categorieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving motorisations for categorieId " + categorieId
          });
        }
      } else {
        res.send(data);
      }
    });
  };

export const deleteById = (req, res) => {
    souscategorie.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found souscategorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete souscategorie with id " + req.params.id
                });
            }
        } else res.send({ message: `souscategorie was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    souscategorie.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all souscategories."
            });
        else res.send({ message: `All souscategories were deleted successfully!` });
    });
};
