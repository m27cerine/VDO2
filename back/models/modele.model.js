import pool from "../config/db.js";

class model {
    constructor(model) {
        this.id_modele = model.id_modele;
        this.nom_modele = model.nom_modele;
    }

    static create(newmodel, result) {
        pool.query("INSERT INTO model SET ?", newmodel, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created model: ", { id: res.insertId, ...newmodel });
            result(null, { id: res.insertId, ...newmodel });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM model WHERE id_modele = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found model: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found model with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_modele, nom_modele FROM modele";
        if (nom) {
          query += ` WHERE nom_modele LIKE '%${nom}%'`;
        }
      
        console.log(`modele.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("modele.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("modele.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, model, result) {
        pool.query(
            "UPDATE modele SET \
            nom_modelee  = ? \
            WHERE id_modelee = ?",
            [
                model.nom_modelee,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found model with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated model: ", { id: id, ...model });
                result(null, { id: id, ...model });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM model WHERE id_modele = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found model with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted model with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM model", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} models`);
            result(null, res);
        });
    }
}

export default model;
