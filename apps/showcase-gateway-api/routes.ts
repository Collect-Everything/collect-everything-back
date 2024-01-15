import express from "express";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Company } from "./utils/types";
import { GenerateToken, VerifyToken } from "./utils/tokens";

dotenv.config({ path: "./.env" });

const router = express.Router();
const microservice1 = process.env.URL_COMPANY_INVOCING_SERVICE;
const microservice2 = process.env.URL_COMPANY_SERVICE;
const microservice3 = process.env.URL_COMPANY_USERS_SERVICE;
const microservice4 = process.env.URL_PRODUCTS_SERVICE;
const microservice5 = process.env.URL_CUSTOMER_SERVICE;
const microservice6 = process.env.URL_CUSTOMERS_INVOICING_SERVICE;
const microservice7 = process.env.URL_ORDER_SERVICE;

const headerMicroservice2 = {
  headers: {
    "X-Custom-Header": "Showcase-gateway-API-data",
  },
};

console.log(microservice2);

// Routes company_invocing
router.post("/company_invocing", async (request, response) => {});

// Routes company
router.post("/company", async (request, response) => {
  if (request.body) {
    try {
      const res: AxiosResponse<Company> = await axios.post<Company>(
        `${microservice2}/create`,
        request.body,
        headerMicroservice2
      );
      if (res.status == 200) {
        response.status(200).json({ data: res.data });
      }
    } catch (error) {
      response.status(500).json({ error });
    }
  }
});

router.post("/company_login", async (request, response) => {
  // Si token dans header, vérification du token
  if (request.headers.authorization) {
    const initialToken = request.headers.authorization;
    const email = request.body.email;
    const isValidToken = VerifyToken(initialToken, email);
    if (isValidToken) response.status(200).json({ token: initialToken });
    else response.status(400).json({ message: "token invalide" });
  }
  // Si pas de token dans header, envoi des données de la requête au microservice de login, si retour 200, génération d'un token
  else if (request.body.email && request.body.password) {
    try {
      const res: AxiosResponse<Company> = await axios.post<Company>(
        `${microservice2}/login`,
        request.body,
        headerMicroservice2
      );
      const email = request.body.email;
      if (res.status == 200) {
        response.status(200).json({ token: GenerateToken(email) });
      }
    } catch (error) {
      response.status(500).json({ error });
    }
  } else
    response
      .status(400)
      .json({ message: "il manque une info dans la requête" });
});

// Routes company_users
router.post("/company_users", (request, response) => {});

// Routes products
router.post("/products", (request, response) => {
  console.log(request.body);
  response.status(200).send("requête envoyée");
});

// Routes customer
router.post("/customer", (request, response) => {
  console.log(request.body);
  response.status(200).send("requête envoyée");
});

// Routes customers_invocing
router.post("/customers_invoicing", (request, response) => {
  console.log(request.body);
  response.status(200).send("requête envoyée");
});

// Routes order
router.post("/order", (request, response) => {
  console.log(request.body);
  response.status(200).send("requête envoyée");
});

export default router;
