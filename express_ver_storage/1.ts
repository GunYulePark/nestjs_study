import * as express from "express";

const app: express.Express = express();
// app: express의 instance. app이 곧 서버 역할

const port: number = 8000;

// 라우터
app.get("/test", (req: express.Request, res: express.Response) => {
  // http://localhost:8000(/) 맨 마지막 주소(/test)로 get을 했을 때 어떻게 응답을 해줄 거니?
  console.log(req);
  res.send({ name: "geon youl park", age: 99, friends: ["ss", "aa", "bb"] });
  // 클라이언트, 프론트 > 백엔드 request
  // 백엔드는 req를 받고, res.send로 프론트로 응답을 보내준다.(response)
  // 프론트는 그 res를 받아서 ui를 만들어 화면에 송출한다.
});

app.post("/test", (req, res) => {
  res.send({ person: "geon" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
