import "reflect-metadata";

import { createConnection } from "typeorm";
import { User } from "./entity/user";

import express from "express";
import bodyParser from "body-parser";

const createServer = async () => {
 let connected = false;
 let logValue = "";
 try {
  await createConnection();
  connected = true;
 } catch (e) {
  console.log(e);
  logValue = `${e}`;
 }

 const app = express();
 app.use(bodyParser.json());

 // Check DataBase Connection
 app.get("/connected", (req, res) => {
  res.status(200);
  res.send({ connected, logValue });
 });

 app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200);
  res.send({ users });
 })

 app.use("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await User.findOne({ id });
  res.status(200);
  res.send({ user });
 });

 app.delete("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  await User.delete({ id });
  res.status(200);
  res.end();
 });

 app.post("/user", async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ id: Date.now() % 100000, name }).save();
  res.status(201);
  res.send({ user });
 });

 app.use("*", (_, res) => {
  res.status(404);
  res.end();
 });

 app.listen(process.env.PORT || 80, () => {
  console.log("STARTED");
 });
}

createServer();