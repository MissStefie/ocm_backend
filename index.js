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
console.log("EMAIL_USER:", process.env.EMAIL_USER); 
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD); 
console.log("MYSQLPORT:", process.env.MYSQLPORT);
console.log("MYSQLHOST:", process.env.MYSQLHOST); 
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE); 
console.log("MYSQLUSER:", process.env.MYSQLUSER); 
console.log("Directorio de trabajo:", process.cwd());
