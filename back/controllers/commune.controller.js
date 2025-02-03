import commune from "../models/commune.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const commune = new commune({
        nomCommune: req.body.nomCommune
    });

    commune.create(commune, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the commune."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("commune.controller.js: findAll called");
  
    const nom = req.query.nomCommune;
    console.log(`commune.controller.js: Query parameter nomCommune = ${nom}`);
  
    commune.getAll(nom, (err, data) => {
      if (err) {
        console.error("commune.controller.js: Error retrieving communes:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving communes.",
        });
      } else {
        console.log("commune.controller.js: communes retrieved successfully:", data);
        res.send(data);
      }
    });
};

export const findOne = (req, res) => {
    commune.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found commune with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving commune with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

export const findByWilaya = (req, res) => {
    const { wilayaId } = req.params;
  
    commune.findByWilayaId(wilayaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Communes not found for wilayaId ${wilayaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving communes for wilayaId " + wilayaId
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

    commune.updateById(
        req.params.id,
        new commune(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found commune with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating commune with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    commune.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found commune with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete commune with id " + req.params.id
                });
            }
        } else res.send({ message: `Commune was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    commune.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all communes."
            });
        else res.send({ message: `All communes were deleted successfully!` });
    });
};
