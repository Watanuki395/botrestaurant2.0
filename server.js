const express = require("express");
const bodyParser = require("body-parser");
const {engine} = require("express-handlebars");
const cors = require('cors');

const app = express();
require('dotenv').config({ path: '.env' })

const port = process.env.PORT || 3000;



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

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});

app.use(cors());
app.use(express.static(__dirname+'/public'));