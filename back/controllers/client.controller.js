import client from "../models/client.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const client = new client({
        nomclient: req.body.nomclient
    });

    client.create(client, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the client."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    console.log("client.controller.js: findAll called");
  
    const nom = req.query.nomclient;
    console.log(`client.controller.js: Query parameter nomclient = ${nom}`);
  
    client.getAll(nom, (err, data) => {
      if (err) {
        console.error("client.controller.js: Error retrieving clients:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving clients.",
        });
      } else {
        console.log("client.controller.js: clients retrieved successfully:", data);
        res.send(data);
      }
    });
  };
  

export const findOne = (req, res) => {
    client.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving client with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    client.updateById(
        req.params.id,
        new client(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found client with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating client with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    client.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete client with id " + req.params.id
                });
            }
        } else res.send({ message: `client was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    client.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all clients."
            });
        else res.send({ message: `All clients were deleted successfully!` });
    });
};
