import Wilaya from "../models/wilaya.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const wilaya = new Wilaya({
        nomWilaya: req.body.nomWilaya
    });

    Wilaya.create(wilaya, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Wilaya."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("wilaya.controller.js: findAll called");
  
    const nom = req.query.nomWilaya;
    console.log(`wilaya.controller.js: Query parameter nomWilaya = ${nom}`);
  
    Wilaya.getAll(nom, (err, data) => {
      if (err) {
        console.error("wilaya.controller.js: Error retrieving wilayas:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Wilayas.",
        });
      } else {
        console.log("wilaya.controller.js: Wilayas retrieved successfully:", data);
        res.json(data); // Use res.json() to ensure proper JSON response
      }
    });
};

export const findOne = (req, res) => {
    Wilaya.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Wilaya with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Wilaya with id " + req.params.id
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

    Wilaya.updateById(
        req.params.id,
        new Wilaya(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Wilaya with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Wilaya with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    Wilaya.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Wilaya with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Wilaya with id " + req.params.id
                });
            }
        } else res.send({ message: `Wilaya was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    Wilaya.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Wilayas."
            });
        else res.send({ message: `All Wilayas were deleted successfully!` });
    });
};
