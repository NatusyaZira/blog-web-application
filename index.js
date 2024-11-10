import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/", function(req, res){
    res.render("index.ejs", {
      });
  });
  app.get("/compose", function(req, res){
    res.render("compose.ejs", {

    });
  });

app.listen(port, () => {
    console.log(`Server lounched on port ${port}.`);
});