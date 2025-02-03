import pool from "../config/db.js";

class piece {
    constructor(piece) {
        this.id_piece = piece.id_piece;
        this.nom_piece = piece.nom_piece;
        this.description = piece.description;
        this.prix = piece.prix;
        this.quantite_stock = piece.quantite_stock;
        this.id_sous_categorie = piece.id_sous_categorie;
    }

    static create(newPiece, result) {
        pool.query("INSERT INTO piece SET ?", newPiece, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created piece: ", { id: res.insertId, ...newPiece });
            result(null, { id: res.insertId, ...newPiece });
        });
    }

    static findById(id, result) {
        pool.query("SELECT * FROM piece WHERE id_piece = ?", [id], (err, res) => {
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

            result({ kind: "not_found" }, null);
        });
    }

    static getAll(nom, result) {
        let query = "SELECT * FROM piece";
        if (nom) {
            query += ` WHERE nom_piece LIKE '%${nom}%'`;
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

    // Récupérer les pièces par catégorie
    static findByCategory(idCategorie, result) {
        const query = `
            SELECT p.* 
            FROM piece p
            JOIN sous_categorie sc ON p.id_sous_categorie = sc.id_sous_categorie
            WHERE sc.id_categorie = ?
        `;

        pool.query(query, [idCategorie], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`Pieces found for category ${idCategorie}: `, res);
            result(null, res);
        });
    }

    // Récupérer les pièces par sous-catégorie
    static findBySubCategory(idSousCategorie, result) {
        const query = "SELECT * FROM piece WHERE id_sous_categorie = ?";

        pool.query(query, [idSousCategorie], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`Pieces found for sub-category ${idSousCategorie}: `, res);
            result(null, res);
        });
    }

    static findBySubCategoryAndMotorisation(idSousCategorie, idMotorisation, result) {
        const query = `
            SELECT p.* 
            FROM piece p
            JOIN piece_motorisation pm ON p.id_piece = pm.id_piece
            WHERE p.id_sous_categorie = ? AND pm.id_motorisation = ?
        `;

        pool.query(query, [idSousCategorie, idMotorisation], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`Pieces found for sub-category ${idSousCategorie} and motorisation ${idMotorisation}: `, res);
            result(null, res);
        });
    }

    static updateById(id, piece, result) {
        pool.query(
            "UPDATE piece SET nom_piece = ?, description = ?, prix = ?, quantite_stock = ?, id_sous_categorie = ? WHERE id_piece = ?",
            [piece.nom_piece, piece.description, piece.prix, piece.quantite_stock, piece.id_sous_categorie, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated piece: ", { id: id, ...piece });
                result(null, { id: id, ...piece });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM piece WHERE id_piece = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
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
