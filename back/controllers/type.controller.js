import Type from "../models/type.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const Type = new Type({
        nomType: req.body.nomType
    });

    Type.create(Type, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Type."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("type.controller.js: findAll called");
  
    const nom = req.query.nomType;
    console.log(`type.controller.js: Query parameter nomType = ${nom}`);
  
    Type.getAll(nom, (err, data) => {
      if (err) {
        console.error("type.controller.js: Error retrieving types:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Types.",
        });
      } else {
        console.log("type.controller.js: Types retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    Type.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Type with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Type with id " + req.params.id
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

    Type.updateById(
        req.params.id,
        new Type(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Type with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Type with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    Type.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Type with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Type with id " + req.params.id
                });
            }
        } else res.send({ message: `Type was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    Type.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Types."
            });
        else res.send({ message: `All Types were deleted successfully!` });
    });
};
