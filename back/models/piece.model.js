import pool from "../config/db.js";

class piece {
    constructor(piece) {
        this.id_piece = piece.id_piece;
        this.nompiece = piece.nompiece;
    }

    static create(newpiece, result) {
        pool.query("INSERT INTO piece SET ?", newpiece, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created piece: ", { id: res.insertId, ...newpiece });
            result(null, { id: res.insertId, ...newpiece });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM piece WHERE id_piece = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found piece: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found piece with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_piece, nompiece FROM piece";
        if (nom) {
          query += ` WHERE nompiece LIKE '%${nom}%'`;
        }
      
        console.log(`piece.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("piece.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("piece.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, piece, result) {
        pool.query(
            "UPDATE piece SET \
            nompiece  = ? \
            WHERE id_piece = ?",
            [
                piece.nompiece,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found piece with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated piece: ", { id: id, ...piece });
                result(null, { id: id, ...piece });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM piece WHERE id_piece = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found piece with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted piece with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM piece", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} pieces`);
            result(null, res);
        });
    }
}

export default piece;
