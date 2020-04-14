const express = require("express");

const db = require('../data/dbConfig');

const router = express.Router();


router.get("/", (req, res) => {
    // select * from posts;
    db.select("*")
      .from("accounts")
      .then(posts => {
        res.status(200).json({ data: posts });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });
  
  router.get("/:id", (req, res) => {
    // read http://knexjs.org/#Builder-where
    db("accounts")
      .where({ id: req.params.id })
      // .where('id', req.params.id)
      .first()
      .then(post => {
        res.status(200).json({ data: post });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });
  
  router.post("/", (req, res) => {
    const postData = req.body;
    db("accounts")
      .insert(postData, "id")
      .then(ids => {
        const id = ids[0];
        db("accounts")
          .where({ id })
          .first()
          .then(post => {
            res.status(201).json({ data: post });
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });
  
  router.patch("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    // update posts set title = 'new title' where id = 5;
    db("accounts")
      .where({ id }) // remember to filter
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "update successful" });
        } else {
          res.status(404).json({ message: "no posts by that id found" });
        }
      })
      .catch(error=>{
          res.status(400).json({ message: 'error updating'})
      })
  });
  
  router.delete("/:id", (req, res) => {
    // find the documentation for deleting records in http://knexjs.org
    // and use the information to implement the delete endpoint
    const { id } = req.params;
    // update posts set title = 'new title' where id = 5;
    db("accounts")
      .where({ id }) // remember to filter
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "deletion successful" });
        } else {
          res.status(404).json({ message: "no posts by that id found" });
        }
      })
      .catch(error=>{
        res.status(400).json({ message: 'error deleting'})
    })
  });
  
  module.exports = router;