import pool from "../config/db.js";

class client {
    constructor(client) {
        this.id_client = client.id_client;
        this.nomclient = client.nomclient;
    }

    static create(newclient, result) {
        pool.query("INSERT INTO client SET ?", newclient, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created client: ", { id: res.insertId, ...newclient });
            result(null, { id: res.insertId, ...newclient });
            console.log('cest Ok !!!');
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM client WHERE id_client = ${id}`, (err, res) => {
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

            // not found client with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT id_client, nomclient FROM client";
        if (nom) {
          query += ` WHERE nomclient LIKE '%${nom}%'`;
        }
      
        console.log(`client.model.js: Executing query: ${query}`);
        pool.query(query, (err, res) => {
          if (err) {
            console.error("client.model.js: Error executing query:", err);
            result(null, err);
            return;
          }
      
          console.log("client.model.js: Query result:", res);
          result(null, res);
        });
      }
      

    static updateById(id, client, result) {
        pool.query(
            "UPDATE client SET \
            nomclient  = ? \
            WHERE id_client = ?",
            [
                client.nomclient,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found client with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated client: ", { id: id, ...client });
                result(null, { id: id, ...client });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM client WHERE id_client = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found client with the id
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
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} clients`);
            result(null, res);
        });
    }
}

export default client;
