import pool from "../config/db.js";

class Vendeur {
    constructor(vendeur) {
        this.id_vendeur = vendeur.id_vendeur;
        this.nom = vendeur.nom;
        this.prenom = vendeur.prenom;
        this.username = vendeur.username;
        this.email = vendeur.email;
        this.telephone = vendeur.telephone;
        this.fax = vendeur.fax;
        this.password = vendeur.password;
        this.accept_terms = vendeur.accept_terms;
        this.type = vendeur.type;
        this.specialite = vendeur.specialite;
        this.registre_commerce = vendeur.registre_commerce;
        this.nif = vendeur.nif;
        this.article_imposition = vendeur.article_imposition;
        this.adresse = vendeur.adresse;
        this.idcommune = vendeur.idcommune;
    }

    static checkUsernameExists(username, result) {
        pool.query("SELECT * FROM vendeur WHERE username = ?", [username], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res.length > 0);
        });
    }

    static checkEmailExists(email, result) {
        pool.query("SELECT * FROM vendeur WHERE email = ?", [email], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res.length > 0);
        });
    }

    static create(newVendeur, result) {
        this.checkUsernameExists(newVendeur.username, (err, exists) => {
            if (err) {
                result(err, null);
                return;
            }
            if (exists) {
                result({ kind: "username_exists" }, null);
                return;
            }
            this.checkEmailExists(newVendeur.email, (err, exists) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (exists) {
                    result({ kind: "email_exists" }, null);
                    return;
                }
                pool.query(
                    "INSERT INTO vendeur (nom, prenom, username, email, telephone, fax, password, accepte_termes, type, specialite, registre_commerce, nif, article_imposition, adresse, idcommune) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        newVendeur.nom,
                        newVendeur.prenom,
                        newVendeur.username,
                        newVendeur.email,
                        newVendeur.telephone,
                        newVendeur.fax,
                        newVendeur.password,
                        newVendeur.accept_terms,
                        newVendeur.type,
                        newVendeur.specialite,
                        newVendeur.registre_commerce,
                        newVendeur.nif,
                        newVendeur.article_imposition,
                        newVendeur.adresse,
                        newVendeur.idcommune
                    ],
                    (err, res) => {
                        if (err) {
                            console.log("Error: ", err);
                            result(err, null);
                            return;
                        }
                        console.log("Created vendeur: ", { id: res.insertId, ...newVendeur });
                        result(null, { id: res.insertId, ...newVendeur });
                    }
                );
            });
        });
    }

    static findById(id, result) {
        pool.query("SELECT * FROM vendeur WHERE id_vendeur = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found vendeur: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT * FROM vendeur";
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

    static updateById(id, vendeurData, result) {
        pool.query(
            "UPDATE vendeur SET nom = ?, prenom = ?, username = ?, email = ?, telephone = ?, fax = ? , password = ?, accept_termes = ?,type = ?, specialite = ?, registre_commerce = ?, nif = ?, article_imposition = ?, adresse = ?, idcommune = ? WHERE id_vendeur = ?",
            [
                vendeurData.nom,
                vendeurData.prenom,
                vendeurData.username,
                vendeurData.email,
                vendeurData.telephone,
                vendeurData.fax,
                vendeurData.password,
                vendeurData.accept_terms,
                vendeurData.type,
                vendeurData.specialite,
                vendeurData.registre_commerce,
                vendeurData.nif,
                vendeurData.article_imposition,
                vendeurData.adresse,
                vendeurData.idcommune,
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
                console.log("updated vendeur: ", { id: id, ...vendeurData });
                result(null, { id: id, ...vendeurData });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM vendeur WHERE id_vendeur = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("deleted vendeur with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM vendeur", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log(`deleted ${res.affectedRows} vendeurs`);
            result(null, res);
        });
    }
}

export default Vendeur;
