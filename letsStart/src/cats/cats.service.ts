import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";

//* READ 고양이 전체 데이터 조회
export const readAllCat = (req: Request, res: Response) => {
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
};

//* READ 특정 고양이 데이터 조회
export const readCat = (req: Request, res: Response) => {
  // 동적 라우팅
  // 클라이언트에서 원하는 id를 입력하면 여기에 맞춰서 데이터 제공
  // :id > param 역할
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
  // - 클라이언트가 어떻게 id를 알까?
  //     세션, 쿠키, jwt의 형식으로 user의 데이터가 저장. 주로 id값을 저장.
  //     그걸 읽어서 프론트 엔드가 uri로 보내준다.
};

//* CREATE 새로운 고양이 추가 api
export const createCat = (req: Request, res: Response) => {
  // user 회원가입, 블로그 포스팅
  // middleware를 추가해줘야 express가 body(에 있는 json) 객체를 읽을 수 있다.
  // 그래서 app.ts에 json middleware 추가해줌.
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
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });
    // throw new Error("db connect error"); // 에러 발생
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updateParialCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body }; // 구조분해 할당
        result = cat;
      }
    });
    // throw new Error("db connect error"); // 에러 발생
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);
    // 해당하는 id에 대당하는 cat만 없어지고, 나머지는 그대로 newCat에 들어간다.
    // throw new Error("db connect error"); // 에러 발생
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
