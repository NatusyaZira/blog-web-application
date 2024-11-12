import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
  });


app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});



app.listen(port, () => {
    console.log(`Server lounched on port ${port}.`);
});