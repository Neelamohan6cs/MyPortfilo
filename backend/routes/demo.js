import express, { Router } from "express";


const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "This is a demo route!",});
});

export default router;