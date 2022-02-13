const express = require("express");
const router = express.Router();
const todo = require("../db");

const obj = {
 id: 1,
 title: "",
 description: "",
 completed: false,
 date: "",
 dateISO: "",
};

router.get("/", async (req, res) => {
 console.log("getRandomDate", getRandomDate().toLocaleDateString()); // 2/14/2022
 console.log("getRandomDate", getRandomDate().toString()); // Mon Feb 14 2022 08:56:50 GMT-0500 (Eastern Standard Time)
 console.log("getRandomDate", getRandomDate().toISOString()); // 2022-02-19T00:56:08.172Z

 res.send({ status: 200 });
});

const getRandDescription = () => {
 const string = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur`;

 // change string to array
 const strArr = string.split(" ");

 // const randStrRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 const randStrRange = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

 const outputStr = [...Array(randStrRange)].map(() => strArr[Math.floor(Math.random() * strArr.length)]).join(" ");

 return outputStr;
};

// returns a random date between today and a week from now
const getRandomDate = () => {
 // get todays date
 const startDate = new Date();
 // get the date a week from now
 const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

 return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

// returns a random boolean
const getRandomBool = () => (Math.round(Math.random()) >= 1 ? true : false);

module.exports = router;
