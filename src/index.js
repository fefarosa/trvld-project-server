/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();

// Database connection
const db = require("./config/db.config");
const passport = require("./config/passport.config");

db();
passport(app);

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

// Routers
const logs = require("./routes/post.routes.js");
const user = require("./routes/user.routes.js");

app.use("/", logs);
app.use("/", user);

// Error handlers middlewares :)
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
