import { Cat, CatType } from "./cats.model";
import { Router } from "express";

const router = Router();

//* READ 고양이 전체 데이터 조회
router.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error"); // 에러 발생
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회
// 동적 라우팅
// 클라이언트에서 원하는 id를 입력하면 여기에 맞춰서 데이터 제공
// :id > param 역할
router.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    // throw new Error("db connect error"); // 에러 발생
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// - 클라이언트가 어떻게 id를 알까?
//     세션, 쿠키, jwt의 형식으로 user의 데이터가 저장. 주로 id값을 저장.
//     그걸 읽어서 프론트 엔드가 uri로 보내준다.

//* CREATE 새로운 고양이 추가 api
// user 회원가입, 블로그 포스팅

// middleware를 추가해줘야 express가 body(에 있는 json) 객체를 읽을 수 있다.
router.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data); // CREATE
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* UPDATE 고양이 데이터 업데이트 -> PUT

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH

//* DELETE 고양이 데이터 삭제 -> DELETE

export default router;
// default 붙이면, import할 때 다른 이름으로 할 수 있다.
