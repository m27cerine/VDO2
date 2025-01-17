import pool from "../config/db.js";

class Type {
    constructor(Type) {
        this.id_Type = Type.id_Type;
        this.nomType = Type.nomType;
    }

    static create(newType, result) {
        pool.query("INSERT INTO Type SET ?", newType, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created Type: ", { id: res.insertId, ...newType });
            result(null, { id: res.insertId, ...newType });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM Type WHERE id_Type = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found Type: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Type with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_Type, nomType FROM Type";
        if (nom) {
          query += ` WHERE nomType LIKE '%${nom}%'`;
        }
      
        console.log(`type.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("type.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("type.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, Type, result) {
        pool.query(
            "UPDATE Type SET \
            nomType  = ? \
            WHERE id_Type = ?",
            [
                Type.nomType,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Type with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated Type: ", { id: id, ...Type });
                result(null, { id: id, ...Type });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM Type WHERE id_Type = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Type with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted Type with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM Type", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} Types`);
            result(null, res);
        });
    }
}

export default Type;
