import pool from "../config/db.js";

class motorisation {
    constructor(motorisation) {
        this.id_motorisation = motorisation.id_motorisation;
        this.type_motorisation = motorisation.type_motorisation;
        this.id_modele = motorisation.id_modele;
    }

    static create(newmotorisation, result) {
        pool.query("INSERT INTO motorisation SET ?", newmotorisation, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created motorisation: ", { id: res.insertId, ...newmotorisation });
            result(null, { id: res.insertId, ...newmotorisation });
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM motorisation WHERE id_motorisation = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found motorisation: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found motorisation with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(type, result) {
        let query = "SELECT id_motorisation, type_motorisation, id_modele FROM motorisation";
        if (type) {
          query += ` WHERE type_motorisation LIKE '%${type}%'`;
        }

        console.log(`motorisation.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("motorisation.model.js: Error executing query:", err);
            result(null, err);
            return;
          }

          console.log("motorisation.model.js: Query result:", res);
          result(null, res);
        });
    }

    static updateById(id, motorisation, result) {
        pool.query(
            "UPDATE motorisation SET type_motorisation = ?, id_modele = ? WHERE id_motorisation = ?",
            [
                motorisation.type_motorisation,
                motorisation.id_modele,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found motorisation with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated motorisation: ", { id: id, ...motorisation });
                result(null, { id: id, ...motorisation });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM motorisation WHERE id_motorisation = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found motorisation with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted motorisation with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM motorisation", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} motorisations`);
            result(null, res);
        });
    }
}

export default motorisation;
