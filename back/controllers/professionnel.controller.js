import professionnelModel from "../models/professionnel.model.js";


export const create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }


    const professionnel = new professionnelModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        accept_terms: req.body.acceptTerms,
        metier: req.body.metier,
        registre_commerce: req.body.registre_commerce,
        identification_fiscale: req.body.identification_fiscale,
        article_imposition: req.body.article_imposition,
        adresse: req.body.adresse,
        inscrit_annuaire: req.body.inscrit_annuaire,
        idCommune: req.body.idCommune
    });

    professionnelModel.create(professionnel, (err, data) => {
        if (err) {
            console.log("Erreur de création :", err);  // Log détaillé
            
            if (err.kind === "username_exists") {
                return res.status(409).send({
                    message: "Ce nom d'utilisateur existe déjà",
                    kind: "username_exists"  // Assurez-vous d'inclure 'kind'
                });
            }
            
            if (err.kind === "email_exists") {
                return res.status(409).send({
                    message: "Cette adresse e-mail est déjà utilisée",
                    kind: "email_exists"  // Assurez-vous d'inclure 'kind'
                });
            }

            return res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création du professionnel."
            });
        }

        res.send(data);
    });
};

export const findAll = (req, res) => {
    const nom = req.query.nom;
    
    professionnelModel.getAll(nom, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving professionnels."
            });
        } else {
            res.send(data);
        }
    });
};

export const findOne = (req, res) => {
    professionnelModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found professionnel with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving professionnel with id " + req.params.id
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

    const professionnelData = new professionnelModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        accept_terms: req.body.acceptTerms,
        metier: req.body.metier,
        registre_commerce: req.body.registre_commerce,
        identification_fiscale: req.body.identification_fiscale,
        article_imposition: req.body.article_imposition,
        adresse: req.body.adresse,
        inscrit_annuaire: req.body.inscrit_annuaire,
        idCommune: req.body.idCommune
    });

    professionnelModel.updateById(req.params.id, professionnelData, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found professionnel with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating professionnel with id " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const deleteById = (req, res) => {
    professionnelModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found professionnel with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete professionnel with id " + req.params.id
                });
            }
        } else {
            res.send({ message: "Professionnel was deleted successfully!" });
        }
    });
};

export const deleteAll = (req, res) => {
    professionnelModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all professionnels."
            });
        } else {
            res.send({ message: "All professionnels were deleted successfully!" });
        }
    });
};
