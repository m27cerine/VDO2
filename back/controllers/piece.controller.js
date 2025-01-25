import piece from "../models/piece.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const piece = new piece({
        nompiece: req.body.nompiece
    });

    piece.create(piece, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the piece."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("piece.controller.js: findAll called");
  
    const nom = req.query.nompiece;
    console.log(`piece.controller.js: Query parameter nompiece = ${nom}`);
  
    piece.getAll(nom, (err, data) => {
      if (err) {
        console.error("piece.controller.js: Error retrieving pieces:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving pieces.",
        });
      } else {
        console.log("piece.controller.js: pieces retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    piece.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found piece with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving piece with id " + req.params.id
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

    piece.updateById(
        req.params.id,
        new piece(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found piece with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating piece with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    piece.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found piece with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete piece with id " + req.params.id
                });
            }
        } else res.send({ message: `piece was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    piece.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all pieces."
            });
        else res.send({ message: `All pieces were deleted successfully!` });
    });
};
