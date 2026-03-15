import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Camera } from "../entities/Camera";

const router = Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Camera);
  const cameras = await repo.find();
  res.json(cameras);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Camera);
  const camera = repo.create(req.body);
  const result = await repo.save(camera);
  res.json(result);
});

export default router;