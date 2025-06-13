import express from "express";
import { postsController } from "../controllers/postsController.js";
import { upload, optimizedImg } from "../middleware/upload.js";

const router = express.Router();

const imageMiddleware = [upload.single("image"), optimizedImg];

// new form
router.get("/posts/new", postsController.new);

// edit form
router.get("/posts/:id/edit", postsController.edit);

// index
router.get("/", postsController.index);

// show post
router.get("/posts/:id", postsController.show);

// create new post
router.post("/posts", imageMiddleware, postsController.create);

// update post
router.patch("/posts/:id", imageMiddleware, postsController.update);

// delete post
router.delete("/posts/:id", postsController.delete);

export default router;
