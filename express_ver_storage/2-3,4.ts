import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

// 미들웨어
// 이 경우엔 맨 앞에 존재해야 logging 가능.
// '/cats/som' 응답 받으면 거기서 끝나서 logging 안남는다.
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next(); // 라우터 찾기
});

app.get("/cats/som", (req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is som middleware");
  next(); // 라우터 찾기
});

// next 함수: 다음 라우터로 이동할 수 있는 함수.
app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat }); // key값과 value값 같으면 생략 가능
});

app.get("/cats/blue", (req, res) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] });
});

// router 3개.
// req에는 요청, res에는 응답 받는다.
// 어디서 요청했는지, 응답했는지 logging > console.log()로 하기엔 한계가 있다
// 미들웨어.

// uri가 위에 것과 일치하는 게 없을 때
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
  next(); // 라우터 찾기
});

// 서버 열어주기
app.listen(8000, () => {
  console.log("server is on...");
});
