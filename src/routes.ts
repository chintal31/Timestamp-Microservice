import { Application } from "express";
import { home, date, hello, currentTime } from "./services";

export const routes = (app: Application) => {
  app.get("/", home);
  app.get("/hello", hello);
  app.get("/api/:date", date);
  app.get("/api/", currentTime);
};
