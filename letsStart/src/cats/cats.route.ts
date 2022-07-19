import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllCat,
  readCat,
  updateCat,
  updateParialCat,
} from "./cats.service";

const router = Router();

router.get("/cats", readAllCat);
router.get("/cats/:id", readCat);
router.post("/cats", createCat);
router.put("/cats/:id", updateCat);
router.patch("/cats/:id", updateParialCat);
router.delete("/cats/:id", deleteCat);

export default router;
// default 붙이면, import할 때 다른 이름으로 할 수 있다.
