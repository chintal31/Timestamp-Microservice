import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { routes } from "./routes";
import cors from "cors";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 6000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, (): void => {
  console.log("Server runnning on " + PORT);
});
