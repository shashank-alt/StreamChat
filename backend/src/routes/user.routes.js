import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  acceptFriendRequest,
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest); // fixed
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests); // incoming requests
router.get("/outgoing-friend-requests", getOutgoingFriendReqs); // outgoing requests

export default router;
