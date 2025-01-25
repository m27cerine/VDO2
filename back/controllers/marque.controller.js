import marque from "../models/marque.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const marque = new marque({
        nommarque: req.body.nommarque
    });

    marque.create(marque, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the marque."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("marque.controller.js: findAll called");
  
    const nom = req.query.nommarque;
    console.log(`marque.controller.js: Query parameter nommarque = ${nom}`);
  
    marque.getAll(nom, (err, data) => {
      if (err) {
        console.error("marque.controller.js: Error retrieving marques:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving marques.",
        });
      } else {
        console.log("marque.controller.js: marques retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    marque.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found marque with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving marque with id " + req.params.id
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

    marque.updateById(
        req.params.id,
        new marque(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found marque with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating marque with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    marque.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found marque with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete marque with id " + req.params.id
                });
            }
        } else res.send({ message: `marque was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    marque.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all marques."
            });
        else res.send({ message: `All marques were deleted successfully!` });
    });
};
