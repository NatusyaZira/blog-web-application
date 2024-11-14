import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("index", {
      posts: posts
    });
  });


app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.post('/delete', (req, res) => {
  const { index } = req.body;
  posts.splice(index, 1);
  res.redirect('/');
});

app.get("/edit/:postName", (req, res) => {
  const reqTitle = req.params.postName;
  posts.forEach((post, index) => {
    const storTitle = post.title;

    if (storTitle === reqTitle) {
      res.render("edit", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.put("/edit/:postName", (req, res) => {
  const reqTitle = req.params.postName;
  const { title, content } = req.body;
const postIndex = posts.findIndex(post => post.reqTitle === reqTitle);
posts[postIndex] = {title, content};
res.redirect('/');
  });

  app.post('/delete', (req, res) => {
    const { index } = req.body;
    posts.splice(index, 1);  // Removes the post at the specified index
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server lounched on port ${port}.`);
});