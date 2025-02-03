import clientModel from "../models/client.model.js";

// Dans le fichier client.controller.js
export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
        return;
    }

    const client = new clientModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        accept_terms: req.body.acceptTerms
    });

    clientModel.create(client, (err, data) => {
        if (err) {
            if (err.kind === "username_exists") {
                res.status(409).send({
                    message: "Ce nom d'utilisateur existe déjà",
                    code: "USERNAME_EXISTS"
                });
            } else {
                res.status(500).send({
                    message: err.message || "Une erreur est survenue lors de la création du client."
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const findAll = (req, res) => {
    const nom = req.query.nom;
    
    clientModel.getAll(nom, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clients."
            });
        } else {
            res.send(data);
        }
    });
};

export const findOne = (req, res) => {
    clientModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving client with id " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const clientData = new clientModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        accept_terms: req.body.acceptTerms
    });

    clientModel.updateById(req.params.id, clientData, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating client with id " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const deleteById = (req, res) => {
    clientModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete client with id " + req.params.id
                });
            }
        } else {
            res.send({ message: "client was deleted successfully!" });
        }
    });
};

export const deleteAll = (req, res) => {
    clientModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all clients."
            });
        } else {
            res.send({ message: "All clients were deleted successfully!" });
        }
    });
};