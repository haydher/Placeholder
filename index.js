const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const picture = require("./routes/picture");
const todos = require("./routes/todos");
const users = require("./routes/users");
const posts = require("./routes/posts");

require("dotenv").config();

const app = express();
app.use(cors());

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

app.get("/", (req, res) => {
 res.send("Hi mom!");
});

// for testing number of proxies for rate limit to work
app.set("trust proxy", process.env.PROXY_NUMBERS);
app.get("/test/api/ip", (request, response) => response.send(request.ip));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port ${port}`));

/*

// done
routes to random pictures
   number of pictures
   specific picture
   picture size 
       
// done
routes to to-do list
   things to do
   title
   description
   done or not
   date to do
   date done

// done
routes to random users
   full name
   username
   picture
   email
   address
   phone
   website

// done
routes to user posts
   number of likes/upvotes
   number of dislikes/downvotes
   multiple pictures for post
   comments 
   likes on comments 
   description 
   date of upload 

   
routes to e-commerce
   name of product
   description
   price
   type
      hoodie
      joggers
      jackets
      shirts
      tank tops
      bikini
      shoes
      kids
   available sizes
   available inventory
   user rating
   color

*/
