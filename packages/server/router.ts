import express from "express";
import type { Request, Response } from "express";
import { chatController } from "./controllers/chat.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

router.get("/hello", (req: Request, res: Response) => {
  res.json({
    message1: "This is a Json response",
    message2: "It came from /api/hello endpoint",
  });
});

router.post("/chat", chatController.sendMessage);

export default router;
