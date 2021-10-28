import { Application } from "express";
import { helloWorld } from "./services";

export const routes = (app: Application) => {
  app.get("/", helloWorld);
};
