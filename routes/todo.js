const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
 console.log("getRandomDate", getRandomDate().toLocaleDateString());
 console.log("getRandomDate", getRandomDate());
 res.send({ status: 200 });
});

// returns a random date between today and a week from now
const getRandomDate = () => {
 const startDate = new Date();
 const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

 return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

// returns a random boolean
const getRandomBool = () => (Math.round(Math.random()) >= 1 ? true : false);

module.exports = router;
