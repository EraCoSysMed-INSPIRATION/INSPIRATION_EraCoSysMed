const express = require("express");
const apiRouter = require("./routes");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const app = express();
const user_db = require("../server/models");
const { ROLES } = require("../server/models");
const Role = user_db.role;

var corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api", apiRouter);
require('./routes/auth_routes')(app);
require('./routes/user_routes')(app);


app.listen(process.env.PORT || "3000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3000"}`);
});

// production sync
// user_db.sequelize.sync();

// development sync, comment out/remove for production
user_db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
};