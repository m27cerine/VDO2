import piece from "../models/piece.model.js";

// Créer une nouvelle pièce
export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const newPiece = new piece({
        nompiece: req.body.nompiece,
        description: req.body.description,
        prix: req.body.prix,
        quantite_stock: req.body.quantite_stock,
        id_sous_categorie: req.body.id_sous_categorie
    });

    piece.create(newPiece, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the piece."
            });
        } else {
            res.send(data);
        }
    });
};

// Récupérer toutes les pièces ou filtrer par nom
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

// Récupérer les pièces par catégorie
export const findByCategory = (req, res) => {
    const idCategorie = req.query.categorie;

    piece.findByCategory(idCategorie, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des pièces par catégorie :", err);
            res.status(500).send({
                message: err.message || "Erreur lors de la récupération des pièces par catégorie."
            });
        } else {
            res.send(data);
        }
    });
};

// Récupérer les pièces par sous-catégorie
export const findBySubCategory = (req, res) => {
    const idSousCategorie = req.query.sousCategorie;

    piece.findBySubCategory(idSousCategorie, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des pièces par sous-catégorie :", err);
            res.status(500).send({
                message: err.message || "Erreur lors de la récupération des pièces par sous-catégorie."
            });
        } else {
            res.send(data);
        }
    });
};

export const findBySubCategoryAndMotorisation = (req, res) => {
    const idSousCategorie = req.query.sousCategorie;
    const idMotorisation = req.query.motorisation;

    piece.findBySubCategoryAndMotorisation(idSousCategorie, idMotorisation, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des pièces par sous-catégorie et motorisation :", err);
            res.status(500).send({
                message: err.message || "Erreur lors de la récupération des pièces par sous-catégorie et motorisation."
            });
        } else {
            res.send(data);
        }
    });
};

// Récupérer une pièce par ID
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
        } else {
            res.send(data);
        }
    });
};

// Mettre à jour une pièce
export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
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
            } else {
                res.send(data);
            }
        }
    );
};

// Supprimer une pièce par ID
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
        } else {
            res.send({ message: `Piece was deleted successfully!` });
        }
    });
};

// Supprimer toutes les pièces
export const deleteAll = (req, res) => {
    piece.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all pieces."
            });
        } else {
            res.send({ message: `All pieces were deleted successfully!` });
        }
    });
};
