import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Hamal } from "../entities/Hamal";

const router = Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Hamal);
  const hamals = await repo.find();
  res.json(hamals);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Hamal);
  const hamal = repo.create(req.body);
  const result = await repo.save(hamal);
  res.json(result);
});

export default router;