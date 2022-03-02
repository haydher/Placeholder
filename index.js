const express = require("express");
const cors = require("cors");
let ejs = require("ejs");
const rateLimit = require("express-rate-limit");

const picture = require("./routes/picture");
const todos = require("./routes/todos");
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

require("dotenv").config();

const app = express();

// for testing number of proxies for rate limit to work
app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static(__dirname + "/public"));

// for all end points other than photos
const limiter = rateLimit({
 windowMs: process.env.API_LIMIT_MINUTE * 60 * 1000, // 1 minute
 max: process.env.API_MAX_LIMIT, // Limit each IP to 30 requests per `window` (here, per 1 minutes)
 standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
 legacyHeaders: false, // Disable the `X-RateLimit-*` headers
 handler: (req, res, next, options) =>
  res.status(429).send({ status: 429, error: "Rate limit has reach. Please try again later." }),
});

// Apply the rate limiting middleware to all requests
// app.use(limiter);

app.use("/photos", picture);
app.use("/todos", limiter, todos);
app.use("/users", limiter, users);
app.use("/posts", limiter, posts);
app.use("/comments", limiter, comments);

app.get("/", (req, res) => {
 res.render("index");
});

// for testing number of proxies for rate limit to work
app.get("/test/api/ip", (request, response) => response.send(request.ip));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port ${port}`));
