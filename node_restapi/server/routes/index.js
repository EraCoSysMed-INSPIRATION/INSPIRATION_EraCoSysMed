const express = require("express");
const db = require("../db");
const router = express.Router();

var tables = [
  "compound",
  "demographic",
  "genetic",
  "observation",
  "profile",
  "reference",
];
// REST endpoints
tables.forEach((value) => {
  router.get(`/${value}/`, async (req, res, next) => {
    try {
      let results = await db.all(`${value}`);
      res.json(results);
    } catch (e) {
      console.log(e);
      res.sendStatus(499);
    }
  });
  router.get(`/${value}/:id`, async (req, res, next) => {
      try {
          let results = await db.one(value, req.params.id);
          res.json(results);
      } catch(e) {
          console.log(e)
          res.sendStatus(499);
      }
  });
});
router.get(`/compound_query/:term`, async (req, res, next) => {
  try {
    let results = await await db.compound_query(req.params.term);
    res.json(results); 
  } catch(e) {
    console.log(e)
    res.sendStatus(499)
  }
});

// export
module.exports = router;