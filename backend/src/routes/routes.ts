import express, { Express } from "express";
import users from "./users";
import auth from "./auth";
import properties from "./properties";
import rooms from "./rooms";

function routes(app: Express) {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/properties", properties);
  app.use("/api/rooms", rooms);
}

export default routes;
