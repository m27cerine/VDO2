import motorisation from "../models/motorisation.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const motorisation = new motorisation({
        nommotorisation: req.body.nommotorisation
    });

    motorisation.create(motorisation, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the motorisation."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("motorisation.controller.js: findAll called");
  
    const nom = req.query.nommotorisation;
    console.log(`motorisation.controller.js: Query parameter nommotorisation = ${nom}`);
  
    motorisation.getAll(nom, (err, data) => {
      if (err) {
        console.error("motorisation.controller.js: Error retrieving motorisations:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving motorisations.",
        });
      } else {
        console.log("motorisation.controller.js: motorisations retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    motorisation.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found motorisation with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving motorisation with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


export const findByModele = (req, res) => {
    const { modeleId } = req.params;
  
    motorisation.findByModeleId(modeleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Motorisations not found for modeleId ${modeleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving motorisations for modeleId " + modeleId
          });
        }
      } else {
        res.send(data);
      }
    });
  };

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    motorisation.updateById(
        req.params.id,
        new motorisation(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found motorisation with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating motorisation with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    motorisation.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found motorisation with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete motorisation with id " + req.params.id
                });
            }
        } else res.send({ message: `motorisation was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    motorisation.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all motorisations."
            });
        else res.send({ message: `All motorisations were deleted successfully!` });
    });
};
