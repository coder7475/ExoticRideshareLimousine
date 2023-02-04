if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const indexRouter = require("./routes/index");
const carRouter = require("./routes/cars");
const limoRouter = require("./routes/limousines");

const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Mongoose"));

app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRouter);
app.use("/cars", carRouter);
app.use("/limos", limoRouter);

app.listen(process.env.PORT || 3000);
