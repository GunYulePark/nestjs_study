//** Create Read */
import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

//* json middleware
app.use(express.json());

//* cats/cats.route의 라우터들 불러오기
app.use(catsRouter);

//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
  next();
});

app.listen(8000, () => {
  console.log("server is on...");
});
