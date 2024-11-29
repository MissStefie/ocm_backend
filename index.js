import dotenv from "dotenv";
//dotenv.config({ path: "./server/.env" });
dotenv.config();

import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import registerRoutes from "./routes/registers.routes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(indexRoutes);
app.use(registerRoutes);

app.listen(PORT);
console.log("Server is running on port", PORT);
console.log("Variables de entorno cargadas:", process.env);
console.log("EMAIL_USER:", process.env.EMAIL_USER); //me sale undefined
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); //me sale undefined
console.log("Directorio de trabajo:", process.cwd());
