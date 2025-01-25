import categorie from "../models/categorie.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const categorie = new categorie({
        nomcategorie: req.body.nomcategorie
    });

    categorie.create(categorie, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the categorie."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("categorie.controller.js: findAll called");
  
    const nom = req.query.nomcategorie;
    console.log(`categorie.controller.js: Query parameter nomcategorie = ${nom}`);
  
    categorie.getAll(nom, (err, data) => {
      if (err) {
        console.error("categorie.controller.js: Error retrieving categories:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving categories.",
        });
      } else {
        console.log("categorie.controller.js: categories retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    categorie.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving categorie with id " + req.params.id
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

    categorie.updateById(
        req.params.id,
        new categorie(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found categorie with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating categorie with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    categorie.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete categorie with id " + req.params.id
                });
            }
        } else res.send({ message: `categorie was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    categorie.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all categories."
            });
        else res.send({ message: `All categories were deleted successfully!` });
    });
};
