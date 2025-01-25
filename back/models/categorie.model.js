import pool from "../config/db.js";

class categorie {
    constructor(categorie) {
        this.id_categorie = categorie.id_categorie;
        this.nomcategorie = categorie.nomcategorie;
    }

    static create(newcategorie, result) {
        pool.query("INSERT INTO categorie SET ?", newcategorie, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created categorie: ", { id: res.insertId, ...newcategorie });
            result(null, { id: res.insertId, ...newcategorie });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM categorie WHERE id_categorie = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found categorie: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found categorie with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_categorie, nomcategorie FROM categorie";
        if (nom) {
          query += ` WHERE nomcategorie LIKE '%${nom}%'`;
        }
      
        console.log(`categorie.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("categorie.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("categorie.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, categorie, result) {
        pool.query(
            "UPDATE categorie SET \
            nomcategorie  = ? \
            WHERE id_categorie = ?",
            [
                categorie.nomcategorie,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found categorie with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated categorie: ", { id: id, ...categorie });
                result(null, { id: id, ...categorie });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM categorie WHERE id_categorie = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found categorie with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted categorie with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM categorie", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} categories`);
            result(null, res);
        });
    }
}

export default categorie;
