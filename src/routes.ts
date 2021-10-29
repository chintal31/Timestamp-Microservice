import { Application } from "express";
import { home, handleDateStr, currentTime } from "./services";

export const routes = (app: Application) => {
  app.get("/", home);
  app.get("/api/:date", handleDateStr);
  app.get("/api/", currentTime);
};
