import vendeurModel from "../models/vendeur.model.js";

export const create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    console.log("Données reçues Controllers:", req.body);


    const vendeur = new vendeurModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        fax: req.body.fax,
        password: req.body.password,
        type: req.body.type,
        specialite: req.body.specialite,
        registre_commerce: req.body.registre_commerce,
        nif: req.body.nif,
        article_imposition: req.body.article_imposition,
        adresse: req.body.adresse,
        accepte_terms: req.body.accepte_terms,
        idcommune: req.body.idcommune
    });

    vendeurModel.create(vendeur, (err, data) => {
        if (err) {
            console.log("Erreur de création :", err);
            
            if (err.kind === "username_exists") {
                return res.status(409).send({
                    message: "Ce nom d'utilisateur existe déjà",
                    kind: "username_exists"
                });
            }
            
            if (err.kind === "email_exists") {
                return res.status(409).send({
                    message: "Cette adresse e-mail est déjà utilisée",
                    kind: "email_exists"
                });
            }

            return res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création du vendeur."
            });
        }

        res.send(data);
    });
};

export const findAll = (req, res) => {
    const nom = req.query.nom;
    
    vendeurModel.getAll(nom, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des vendeurs."
            });
        } else {
            res.send(data);
        }
    });
};

export const findOne = (req, res) => {
    vendeurModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Vendeur introuvable avec l'id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la récupération du vendeur avec l'id " + req.params.id
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
            message: "Le contenu ne peut pas être vide!"
        });
    }

    const vendeurData = new vendeurModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        fax: req.body.fax,
        password: req.body.password,
        type: req.body.type,
        specialite: req.body.specialite,
        registre_commerce: req.body.registre_commerce,
        nif: req.body.nif,
        article_imposition: req.body.article_imposition,
        adresse: req.body.adresse,
        accepte_terms: req.body.accepte_terms,
        idcommune: req.body.idcommune
    });

    vendeurModel.updateById(req.params.id, vendeurData, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Vendeur introuvable avec l'id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la mise à jour du vendeur avec l'id " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const deleteById = (req, res) => {
    vendeurModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Vendeur introuvable avec l'id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer le vendeur avec l'id " + req.params.id
                });
            }
        } else {
            res.send({ message: "Le vendeur a été supprimé avec succès!" });
        }
    });
};

export const deleteAll = (req, res) => {
    vendeurModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la suppression de tous les vendeurs."
            });
        } else {
            res.send({ message: "Tous les vendeurs ont été supprimés avec succès!" });
        }
    });
};
