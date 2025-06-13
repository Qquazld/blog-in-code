import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import postsRoutes from "./src/routes/postsRoutes.js";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

// method-override middleware for HTML forms (allows PATCH requests via POST)
app.use(methodOverride("_method"));

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Security middleware to set HTTP headers (Helmet)
app.use(helmet());

// Set EJS as the view engine
app.use(express.static(path.join(process.cwd(), "public")));

// Use express-ejs-layouts middleware for layout support
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Set the directory where the views (templates) are located
app.set("views", path.join(process.cwd(), "src", "views"));

// Routes
app.use("/", postsRoutes);

// 404 errors
app.use((req, res) => {
  res.status(404).render("pages/404");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
