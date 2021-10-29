import { Application } from "express";
import { home, date, currentTime } from "./services";

export const routes = (app: Application) => {
  app.get("/", home);
  app.get("/api/:date", date);
  app.get("/api/", currentTime);
};
