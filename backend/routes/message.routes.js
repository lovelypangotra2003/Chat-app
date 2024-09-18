import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);//protect route ensures user is logged in before sending//authorization


export default router;