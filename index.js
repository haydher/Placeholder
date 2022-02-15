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

const limiter = rateLimit({
 //  windowMs: 15 * 60 * 1000, // 15 minutes
 windowMs: 1 * 60 * 1000, // 1 minute
 max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
 standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
 legacyHeaders: false, // Disable the `X-RateLimit-*` headers
 handler: (req, res, next, options) => res.status(429).send({ error: "Rate limit has reach. Please try again later." }),
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use("/photo", picture);
app.use("/todos", todos);
app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req, res) => {
 res.send("Hello World");
});

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
