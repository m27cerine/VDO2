import modele from "../models/modele.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const modele = new modele({
        nommodele: req.body.nommodele
    });

    modele.create(modele, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the modele."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("modele.controller.js: findAll called");
  
    const nom = req.query.nommodele;
    console.log(`modele.controller.js: Query parameter nommodele = ${nom}`);
  
    modele.getAll(nom, (err, data) => {
      if (err) {
        console.error("modele.controller.js: Error retrieving modeles:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving modeles.",
        });
      } else {
        console.log("modele.controller.js: modeles retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    modele.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found modele with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving modele with id " + req.params.id
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

    modele.updateById(
        req.params.id,
        new modele(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found modele with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating modele with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    modele.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found modele with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete modele with id " + req.params.id
                });
            }
        } else res.send({ message: `modele was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    modele.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all modeles."
            });
        else res.send({ message: `All modeles were deleted successfully!` });
    });
};
