// Must be at top
import "reflect-metadata";

import { createConnection } from "typeorm";

import express from "express"

const createServer = async () => {
 let connected = false;
 let logValue = "";
 try {
  await createConnection({ type: 'postgres', url: process.env.DATABASE_URI });
  connected = true;
 } catch (e) {
  logValue = `${e}`;
 }
 const app = express();

 // Check DataBase Connection
 app.get("/connected", (req, res) => {
  res.status(200);
  res.send({ connected, logValue });
 });

 app.use("*", (req, res) => {
  res.status(200);
  res.send({ "status": "OK" });
 });
 
 app.listen(process.env.PORT || 80);
}

createServer();