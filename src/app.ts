import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const app: Application = express();
// middleware
app.use(express.json());
app.use(cors());

// single student create / student insert 
app.use("/api/v1/student", StudentRoutes);
// // all student get
// app.use("/", StudentRoutes);
// // single student get
// app.use('/' , StudentRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
