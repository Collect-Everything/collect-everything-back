import express from "express";
import { sequelize } from "./index";
import { Company } from "./utils/company.model";

export const router = express.Router();

// Création compte entreprise ()
router.post("/create", async (request, response) => {
  if (request.body) {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
        response.status(500).json({ message: "Erreur lors de la connection" });
      });

    Company.create({
      name: request.body.name,
      email: request.body.email,
      email_contact: request.body.email,
    })
      .then((res: any) => {
        console.log(res);
        response.status(200).json({ message: "company created" });
      })
      .catch((error: any) => {
        console.error("Failed to create new company", error);
        response.status(500).json({ message: "erreur lors de la création" });
      });
  } else response.status(500).json({ erreur: "requête vide" });
});

// Récupérer toutes les entreprises

// Récupérer toutes les entreprises avec filtres

// Récupérer entreprise avec URL personnalisée

// MAJ entreprise

// Souscription abonnement

// Arrêter abonnement

// Supprimer une entreprise
