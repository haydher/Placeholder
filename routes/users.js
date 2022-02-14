const express = require("express");
const router = express.Router();
const { getRandNum, getUserName, getRandomDomain, formatePhoneNum } = require("../utils");
const { firstNames, lastNames, addresses, womanThumbnails, manThumbnails } = require("../db");

router.get("/:length?", (req, res) => {
 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const users = [];

 for (let index = 0; index < length; index++) {
  const firstName = firstNames[getRandNum(0, firstNames.length - 1)];
  const lastName = lastNames[getRandNum(0, lastNames.length - 1)];
  const username = getUserName(firstName, lastName);
  const sex = Math.round(Math.random()) === 1 ? "female" : "male";
  const address = addresses[getRandNum(0, addresses.length - 1)];
  const phone = Math.floor(getRandNum(1000000000, 9000000000));
  const thumbnail =
   sex === "female"
    ? womanThumbnails[getRandNum(0, womanThumbnails.length - 1)]
    : manThumbnails[getRandNum(0, manThumbnails.length - 1)];

  users.push({
   id: index + 1,
   firstName,
   lastName,
   username: username,
   sex,
   thumbnail,
   age: getRandNum(21, 65),
   email: `${getUserName(firstName, lastName)}@${getRandomDomain()}.com`,
   address,
   phone,
   phoneFormatted: formatePhoneNum(phone),
   website: `www.${username.toLocaleLowerCase()}.com`,
  });
 }

 res.send({ status: 200, users });
});

module.exports = router;
