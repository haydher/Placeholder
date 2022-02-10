const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();

// main endpoint for getting a random picture for front end
router.get("/:param?", async (req, res) => {
 const queryObj = {
  query: req.params.param,
  orientation: req.query.orientation,
 };

 try {
  // redirected url from Unsplash
  const imgURL = await getRandomPic(queryObj);
  res.redirect(imgURL);
 } catch (error) {
  console.log("error in sending data");
  res.send("unable to send data");
 }
});

// get the random pic for the param with "random"
const getRandomPic = async (query) => {
 const accessKey = process.env.ACCESS_KEY;

 const fetchURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&${getUpdatedUrl(query)}`;

 try {
  const response = await fetch(fetchURL);
  const data = await response.json();
  return data.urls.regular;
 } catch (error) {
  console.error("Error fetching img", error);
  return error;
 }
};

// updates the api url with given query params
const getUpdatedUrl = (query) => {
 // return selected queries that are valid
 return Object.keys(query)
  .filter((key) => query[key])
  .map((key) => `${key}=${query[key]}`)
  .join("&");
};

// router.get("/random", async (req, res) => {
//  const url = "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg";
//  res.send("success").redirect(url);
// });

// // use to post items. although makes no difference, good practice to use proper http protocols
// router.post("/", async (req, res) => {
//   res.send("posted");
// });

// // use put when editing something
// router.put("/id/:id", async (req, res) => {

//  res.send("edited");
// });

// // to delete something
// router.delete("/id/:id", async (req, res) => {

//  res.send(deleteObj);
// });

module.exports = router;
