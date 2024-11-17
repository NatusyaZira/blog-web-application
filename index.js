import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (reg, res) => {
    res.render("index", {
        posts: posts
    });
});

app.get("/compose", (req, res) => {
    res.render("compose")
});


app.get("/edit/:postName", (req, res) => {
    const reqTitle = req.params.postName;
    posts.forEach((post) => {
      const storTitle = post.title;
      if (storTitle === reqTitle) {
        res.render("edit", {
          title: post.title,
          content: post.content
        });
      }
    });
  });


  app.post("/edit", (req, res) => {
    const postName = req.params.postName;
    const editPost = posts.findIndex((post) => post.postName === postName);
    if(editPost === -1) {
        res.send("<h1>Something went wrong</h1>")
    }

    const updatedTitle = req.body.postTitle;
    const updatedContent = req.body.postBody;

    const postTitle = (posts[editPost].title = updatedTitle);
    const postContent = (posts[editPost].content = updatedContent);
    [...posts, { postTitle: postTitle, postContent: postContent}];

    res.render("index", {
        posts: posts
    });
  });

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
            const index = {index: req.body.index};
            posts.splice(index, 1);
            res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
