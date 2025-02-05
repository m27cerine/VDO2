import pool from "../config/db.js";

class commune {
    constructor(commune) {
        this.idCommune = commune.idCommune;
        this.commune = commune.commune;
        this.idWilaya = commune.idWilaya;
    }

    static create(newCommune, result) {
        pool.query("INSERT INTO commune SET ?", newCommune, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created commune: ", { id: res.insertId, ...newCommune });
            result(null, { id: res.insertId, ...newCommune });
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM commune WHERE idCommune = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found commune: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found commune with the id
            result({ kind: "not_found" }, null);
        });
    }

    static findByWilayaId(wilayaId, result) {
        const query = "SELECT * FROM commune WHERE idWilaya = ?";
        pool.query(query, [wilayaId], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("Communes found: ", res);
                result(null, res);
            } else {
                // Aucun résultat trouvé
                result({ kind: "not_found" }, null);
            }
        });
    }

    static getAll(commune, result) {
        let query = "SELECT idCommune, commune, idWilaya FROM commune";
        if (commune) {
            query += ` WHERE commune LIKE '%${commune}%'`;
        }

        console.log(`commune.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
            if (err) {
                console.error("commune.model.js: Error executing query:", err);
                result(null, err);
                return;
            }

            console.log("commune.model.js: Query result:", res);
            result(null, res);
        });
    }

    static updateById(id, commune, result) {
        pool.query(
            "UPDATE commune SET commune = ?, idWilaya = ? WHERE idCommune = ?",
            [
                commune.commune,
                commune.idWilaya,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found commune with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated commune: ", { id: id, ...commune });
                result(null, { id: id, ...commune });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM commune WHERE idCommune = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found commune with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted commune with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM commune", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} communes`);
            result(null, res);
        });
    }
}

export default commune;
