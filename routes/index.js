import express from "express";
import {
  addToCartController,
  loginController,
  registerController,
} from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/cart", addToCartController.cartItems);
router.get("/latestCart", isAuthenticated, addToCartController.latestCarts);
router.get("/verifiedCart", isAuthenticated, addToCartController.verifiedCarts);
router.get(
  "/completedCart",
  isAuthenticated,
  addToCartController.completedCarts
);
router.get("/singleCart/:id", isAuthenticated, addToCartController.singleCart);
router.get(
  "/updateToVerifiedBooking/:id",
  isAuthenticated,
  addToCartController.updateToVerifiedBooking
);
router.get(
  "/updateToCompletedBooking/:id",
  isAuthenticated,
  addToCartController.updateToCompletedBooking
);

export default router;
