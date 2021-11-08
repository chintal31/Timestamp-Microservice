import { Application } from "express";
import { home, hire, getEmployees, promote, fireEmployee } from "./services";

export const routes = (app: Application) => {
  app.get("/", home);

  //Employee
  app.post("/hire", hire);
  app.get("/getEmployees", getEmployees);
  app.put("/promote", promote);
  app.delete("/fireEmployee", fireEmployee);
};
