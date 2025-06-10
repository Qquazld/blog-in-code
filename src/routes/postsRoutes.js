import express from "express";
import { postsController } from "../controllers/postsController.js";
import { upload, optimizedImg } from "../middleware/upload.js";

const router = express.Router();

// new form
router.get("/posts/new", postsController.new);

// edit form
router.get("/posts/:id/edit", postsController.edit);

// index
router.get("/", postsController.index);

// show post
router.get("/posts/:id", postsController.show);

// create new post, render index
router.post("/", upload.single("image"), optimizedImg, (req, res) => {
  postsController.create(req, res);
});

// update post
router.patch("/posts/:id", upload.single("image"), optimizedImg, (req, res) => {
  postsController.update(req, res);
});

// delete post
router.delete("/posts/:id", postsController.delete);

export default router;
