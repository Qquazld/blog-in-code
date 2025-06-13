import { posts } from "./data/posts.js";

export function getLatestPosts(allPosts, limit = 5) {
  return allPosts.slice(0, limit);
}

export const getImageUrl = (post) => post.image || "/uploads/default-image.jpg";

export function getPostById(id) {
  return posts.find((p) => p.id === id);
}

export function getPostIndexById(id) {
  return posts.findIndex((p) => p.id === id);
}

export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}
