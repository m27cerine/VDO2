import pool from "../config/db.js";

class client {
    constructor(client) {
        this.id_client = client.id_client;
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.username = client.username;
        this.email = client.email;
        this.telephone = client.telephone;
        this.password = client.password;
        this.accept_terms = client.accept_terms;
    }

// Dans client.model.js, ajoutez cette nouvelle méthode statique
static checkUsernameExists(username, result) {
    pool.query("SELECT * FROM client WHERE username = ?", [username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res.length > 0);
    });
}

// Modifiez la méthode create pour vérifier d'abord si le username existe
static create(newClient, result) {
    this.checkUsernameExists(newClient.username, (err, exists) => {
        if (err) {
            result(err, null);
            return;
        }
        
        if (exists) {
            result({ kind: "username_exists" }, null);
            return;
        }

        pool.query(
            "INSERT INTO client (nom, prenom, username, email, telephone, password, accept_terms) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                newClient.nom,
                newClient.prenom,
                newClient.username,
                newClient.email,
                newClient.telephone,
                newClient.password,
                newClient.accept_terms
            ],
            (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(err, null);
                    return;
                }

                console.log("Created client: ", { id: res.insertId, ...newClient });
                result(null, { id: res.insertId, ...newClient });
            }
        );
    });
}

    static findById(id, result) {
        pool.query(`SELECT * FROM client WHERE id_client = ?`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found client: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT * FROM client";
        let queryParams = [];
        
        if (nom) {
            query += ` WHERE nom LIKE ?`;
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

    static updateById(id, clientData, result) {
        pool.query(
            "UPDATE client SET nom = ?, prenom = ?, username = ?, email = ?, telephone = ?, password = ?, accept_terms = ? WHERE id_client = ?",
            [
                clientData.nom,
                clientData.prenom,
                clientData.username,
                clientData.email,
                clientData.telephone,
                clientData.password,
                clientData.accept_terms,
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

                console.log("updated client: ", { id: id, ...clientData });
                result(null, { id: id, ...clientData });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM client WHERE id_client = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted client with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM client", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`deleted ${res.affectedRows} clients`);
            result(null, res);
        });
    }
}

export default client;
