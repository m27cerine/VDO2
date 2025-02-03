import pool from "../config/db.js";

class professionnel {
    constructor(professionnel) {
        this.id_professionnel = professionnel.id_professionnel;
        this.nom = professionnel.nom;
        this.prenom = professionnel.prenom;
        this.username = professionnel.username;
        this.email = professionnel.email;
        this.telephone = professionnel.telephone;
        this.password = professionnel.password;
        this.accept_terms = professionnel.accept_terms;
        this.metier = professionnel.metier;
        this.registre_commerce = professionnel.registre_commerce;
        this.identification_fiscale = professionnel.identification_fiscale;
        this.article_imposition = professionnel.article_imposition;
        this.adresse = professionnel.adresse;
        this.inscrit_annuaire = professionnel.inscrit_annuaire;
        this.idCommune = professionnel.idCommune;
    }

    // Vérifier si le username existe déjà
    static checkUsernameExists(username, result) {
        pool.query("SELECT * FROM professionnel WHERE username = ?", [username], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res.length > 0);
        });
    }

    static checkEmailExists(email, result) {
        pool.query("SELECT * FROM professionnel WHERE email = ?", [email], (err, res) => { // Correction ici
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res.length > 0);
        });
    }
    
    // Méthode de création d'un nouveau professionnel
    static create(newProfessionnel, result) {
        this.checkUsernameExists(newProfessionnel.username, (err, exists) => {
            if (err) {
                result(err, null);
                return;
            }
    
            if (exists) {
                result({ kind: "username_exists" }, null);
                return;
            }
    
            this.checkEmailExists(newProfessionnel.email, (err, exists) => {
                if (err) {
                    result(err, null);
                    return;
                }
    
                if (exists) {
                    result({ kind: "email_exists" }, null);
                    return;
                }
    
            pool.query(
                "INSERT INTO professionnel (nom, prenom, username, email, telephone, password, accept_terms, metier, registre_commerce, identification_fiscale, article_imposition, adresse, inscrit_annuaire, idCommune) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    newProfessionnel.nom,
                    newProfessionnel.prenom,
                    newProfessionnel.username,
                    newProfessionnel.email,
                    newProfessionnel.telephone,
                    newProfessionnel.password,
                    newProfessionnel.accept_terms,
                    newProfessionnel.metier,
                    newProfessionnel.registre_commerce,
                    newProfessionnel.identification_fiscale,
                    newProfessionnel.article_imposition,
                    newProfessionnel.adresse,
                    newProfessionnel.inscrit_annuaire,
                    newProfessionnel.idCommune
                ],
                (err, res) => {
                    if (err) {
                        console.log("Error: ", err);
                        result(err, null);
                        return;
                    }

                    console.log("Created professionnel: ", { id: res.insertId, ...newProfessionnel });
                    result(null, { id: res.insertId, ...newProfessionnel });
                }
            );
        });
    });
    }

    // Trouver un professionnel par son ID
    static findById(id, result) {
        pool.query("SELECT * FROM professionnel WHERE id_professionnel = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found professionnel: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        });
    }

    // Récupérer tous les professionnels
    static getAll(nom, result) {
        let query = "SELECT * FROM professionnel";
        let queryParams = [];
        
        if (nom) {
            query += " WHERE nom LIKE ?";
            queryParams.push(`%${nom}%`);
        }

        console.log(`Executing query: ${query}`);
        pool.query(query, queryParams, (err, res) => {
            if (err) {
                console.error("Error executing query:", err);
                result(err, null);
                return;
            }

            console.log("Query result:", res);
            result(null, res);
        });
    }

    // Mettre à jour un professionnel par ID
    static updateById(id, professionnelData, result) {
        pool.query(
            "UPDATE professionnel SET nom = ?, prenom = ?, username = ?, email = ?, telephone = ?, password = ?, accept_terms = ?, metier = ?, registre_commerce = ?, identification_fiscale = ?, article_imposition = ?, adresse = ?, inscrit_annuaire = ?, idCommune = ? WHERE id_professionnel = ?",
            [
                professionnelData.nom,
                professionnelData.prenom,
                professionnelData.username,
                professionnelData.email,
                professionnelData.telephone,
                professionnelData.password,
                professionnelData.accept_terms,
                professionnelData.metier,
                professionnelData.registre_commerce,
                professionnelData.identification_fiscale,
                professionnelData.article_imposition,
                professionnelData.adresse,
                professionnelData.inscrit_annuaire,
                professionnelData.idCommune,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated professionnel: ", { id: id, ...professionnelData });
                result(null, { id: id, ...professionnelData });
            }
        );
    }

    // Supprimer un professionnel par ID
    static remove(id, result) {
        pool.query("DELETE FROM professionnel WHERE id_professionnel = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted professionnel with id: ", id);
            result(null, res);
        });
    }

    // Supprimer tous les professionnels
    static removeAll(result) {
        pool.query("DELETE FROM professionnel", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`deleted ${res.affectedRows} professionnels`);
            result(null, res);
        });
    }
}

export default professionnel;
