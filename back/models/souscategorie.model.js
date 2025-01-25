import pool from "../config/db.js";

class souscategorie {
    constructor(souscategorie) {
        this.id_souscategorie = souscategorie.id_souscategorie;
        this.nomsouscategorie = souscategorie.nomsouscategorie;
    }

    static create(newsouscategorie, result) {
        pool.query("INSERT INTO souscategorie SET ?", newsouscategorie, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created souscategorie: ", { id: res.insertId, ...newsouscategorie });
            result(null, { id: res.insertId, ...newsouscategorie });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM souscategorie WHERE id_souscategorie = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found souscategorie: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found souscategorie with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_souscategorie, nomsouscategorie FROM souscategorie";
        if (nom) {
          query += ` WHERE nomsouscategorie LIKE '%${nom}%'`;
        }
      
        console.log(`souscategorie.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("souscategorie.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("souscategorie.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, souscategorie, result) {
        pool.query(
            "UPDATE souscategorie SET \
            nomsouscategorie  = ? \
            WHERE id_souscategorie = ?",
            [
                souscategorie.nomsouscategorie,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found souscategorie with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated souscategorie: ", { id: id, ...souscategorie });
                result(null, { id: id, ...souscategorie });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM souscategorie WHERE id_souscategorie = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found souscategorie with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted souscategorie with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM souscategorie", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} souscategories`);
            result(null, res);
        });
    }
}

export default souscategorie;
