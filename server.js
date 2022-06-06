const express = require("express");
const cookieParser = require("cookie-parser");
const {engine} = require("express-handlebars");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser());

require('dotenv').config({ path: '.env' })
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs');
app.set("views", "./views");

// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "20mb",
  })
);

app.use("/messenger", require("./Facebook/facebookBot"));

app.get("/", (req, res) => {
  return res.send("Chatbot Funcionando 🤖🤖🤖");
});

app.use("/views", require("./routes/views"));
app.use("/api/auth/", require("./routes/auth"));

app.use("/api/user/", require("./routes/users"));
app.use("/api/product/", require("./routes/products"));

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});

