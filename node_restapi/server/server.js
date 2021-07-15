const express = require("express");
const apiRouter = require("./routes");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const app = express();
const user_db = require("../server/models");

var corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api", apiRouter);

app.listen(process.env.PORT || "3000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3000"}`);
});

user_db.sequelize.sync();

