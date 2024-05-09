import express from "express";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import path from "path";

dotenv.config();

mongoose
  .connect(
    process.env.MONGO // on utilise la variable d'environnement MONGO pour la connexion à la base de données
  )
  .then(() => {
    console.log("Connected to database successfully");
  }).catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve(); 
const app = express();
app.use(express.json()); // coe il n'est pas permis d'envoyer des doe en format json au server,
                         // on utilise cette méthode pour permettre au server de les lire

app.use(cookieParser()); // on utilise cette méthode pour permettre au server de lire les cookies

// nous avons fait "type": "module", dans le package.json pour corriger le soucis d'imports
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "client/dist"))); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// création d'un middleware pour gérer les erreurs dans les requêtes
// next permet de passer à l'erreur suivante dans la pile d'erreur si il y en a  plusieurs
app.use((err, req, res, next) => { 
  const statusCode =  err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
  });
});    