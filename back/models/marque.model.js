import pool from "../config/db.js";

class marque {
    constructor(marque) {
        this.id_marque = marque.id_marque;
        this.nom_marque = marque.nom_marque;
    }

    static create(newmarque, result) {
        pool.query("INSERT INTO marque SET ?", newmarque, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created marque: ", { id: res.insertId, ...newmarque });
            result(null, { id: res.insertId, ...newmarque });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM marque WHERE id_marque = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found marque: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found marque with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_marque, nom_marque FROM marque";
        if (nom) {
          query += ` WHERE nom_marque LIKE '%${nom}%'`;
        }
      
        console.log(`marque.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("marque.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("marque.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, marque, result) {
        pool.query(
            "UPDATE marque SET \
            nom_marque  = ? \
            WHERE id_marque = ?",
            [
                marque.nom_marque,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found marque with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated marque: ", { id: id, ...marque });
                result(null, { id: id, ...marque });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM marque WHERE id_marque = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found marque with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted marque with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM marque", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} marques`);
            result(null, res);
        });
    }
}

export default marque;
