const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan=require('morgan')
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(4002, () => {
  console.log("Server is UP");
});
