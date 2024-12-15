import express from "express";
import path from "path";
import methodOverride from "method-override";
import postsRoutes from "./routes/postsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// method-override pour les formulaires HTML (permet de faire passer une requête PATCH comme POST)
app.use(methodOverride("_method"));

// Middleware pour analyser les données des formulaires HTML (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Configurer Express pour servir les fichiers statiques
app.use(express.static("public"));

// Configuration d'EJS comme moteur de templates
app.set("view engine", "ejs");

// Configuration du répertoire des vues
app.set("views", path.join(process.cwd(), "views/pages"));

// Routes
app.use("/", postsRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
