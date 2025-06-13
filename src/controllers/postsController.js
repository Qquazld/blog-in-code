import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../helpers.js";
import {
  getPostById,
  getPostIndexById,
  getLatestPosts,
  getImageUrl,
} from "../helpers.js";
import { posts } from "../data/posts.js";

export const postsController = {
  index: (req, res) => {
    res.render("pages/index", {
      posts,
      latestPosts: getLatestPosts(posts),
      getImageUrl,
      formatDate,
    });
  },
  show: (req, res) => {
    const post = getPostById(req.params.id);
    if (post) {
      res.render("pages/post", { posts, post, getImageUrl, formatDate });
    } else {
      res.status(404).render("pages/404");
    }
  },
  new: (req, res) => {
    res.render("pages/form");
  },
  create: (req, res) => {
    const newPost = {
      id: uuidv4(),
      title: req.body.title,
      content: req.body.content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      date: new Date().toISOString(),
    };
    posts.unshift(newPost);
    res.redirect("/");
  },
  edit: (req, res) => {
    const post = getPostById(req.params.id);
    if (post) {
      res.render("pages/formEdit", { post });
    } else {
      res.status(404).render("pages/404");
    }
  },
  update: (req, res) => {
    const post = getPostById(req.params.id);
    if (post) {
      post.title = req.body.title;
      post.content = req.body.content;
      if (req.file) {
        post.image = `/uploads/${req.file.filename}`;
      }
      res.redirect(`/posts/${req.params.id}`);
    } else {
      res.status(404).render("pages/404");
    }
  },
  delete: (req, res) => {
    const postIndex = getPostIndexById(req.params.id);
    if (postIndex > -1) {
      posts.splice(postIndex, 1);
      res.redirect("/");
    } else {
      res.status(404).render("pages/404");
    }
  },
};
