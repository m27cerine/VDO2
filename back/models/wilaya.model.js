import pool from "../config/db.js";

class Wilaya {
    constructor(wilaya) {
        this.id_Wilaya = wilaya.id_Wilaya;
        this.nomWilaya = wilaya.nomWilaya;
    }

    static create(newWilaya, result) {
        pool.query("INSERT INTO Wilaya SET ?", newWilaya, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created Wilaya: ", { id: res.insertId, ...newWilaya });
            result(null, { id: res.insertId, ...newWilaya });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM Wilaya WHERE idWilaya = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found Wilaya: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Wilaya with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT idWilaya, wilaya FROM Wilaya";
        if (nom) {
          query += ` WHERE wilaya LIKE '%${nom}%'`;
        }
      
        console.log(`wilaya.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("wilaya.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("wilaya.model.js: Query result:", res);
          result(null, res);
        });
    }

    static updateById(id, wilaya, result) {
        pool.query(
            "UPDATE Wilaya SET \
            wilaya  = ? \
            WHERE idWilaya = ?",
            [
                wilaya.nomWilaya,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Wilaya with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated Wilaya: ", { id: id, ...wilaya });
                result(null, { id: id, ...wilaya });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM Wilaya WHERE idWilaya = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Wilaya with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted Wilaya with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM Wilaya", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} Wilayas`);
            result(null, res);
        });
    }
}

export default Wilaya;
