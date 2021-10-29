import { Application } from "express";
import { helloWorld, date, currentTime } from "./services";

export const routes = (app: Application) => {
  app.get("/", helloWorld);
  app.get("/api/:date", date);
  app.get("/api/", currentTime);
};
