/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable quotes */
const mongoose = require("mongoose");

function initializeDB() {
  mongoose
    .connect(`${process.env.MONGODB_URI}/travel-log`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((conn) => {
      console.log(`Sucessfully connected to DB: ${conn.connections[0].name}`);
    })
    .catch((err) =>
      console.error(`Failed to connect to database, details: `, err)
    );
}

module.exports = initializeDB;
