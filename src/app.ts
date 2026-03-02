import express, { Application, request, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import {notFound } from "./middlewares/notFound"
import {errorHandler} from "./middlewares/globalErrorHandler"

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello from new project ");
});
app.use(errorHandler)
app.use(notFound)

export default app;
