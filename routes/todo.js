const express = require("express");
const router = express.Router();
const todo = require("../titles");
const { getRandStr, getRandomBool, getRandomDate } = require("../utils");

router.get("/:length?", async (req, res) => {
 const todoList = todo;

 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const data = [];
 for (let index = 0; index < length; index++) {
  data.push({
   id: index + 1,
   title: `${todoList[Math.floor(Math.random() * (todoList.length - 0 + 1)) + 0]}`,
   description: getRandStr(),
   completed: getRandomBool(),
   date: getRandomDate().toLocaleDateString(),
   dateISO: getRandomDate().toISOString(),
  });
 }

 res.send({ status: 200, data });
});

module.exports = router;
