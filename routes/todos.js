const express = require("express");
const router = express.Router();
const { titles } = require("../db");
const { getRandStr, getRandomBool, getRandomDate } = require("../utils");

router.get("/:length?", async (req, res) => {
 const todoTitles = titles;

 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const todos = [];
 for (let index = 0; index < length; index++) {
  todos.push({
   id: index + 1,
   title: `${todoTitles[Math.floor(Math.random() * (todoTitles.length - 0 + 1)) + 0]}`,
   description: getRandStr(),
   completed: getRandomBool(),
   date: getRandomDate().toLocaleDateString(),
   dateISO: getRandomDate().toISOString(),
  });
 }

 res.status(200).send({ status: 200, todos });
});

module.exports = router;
