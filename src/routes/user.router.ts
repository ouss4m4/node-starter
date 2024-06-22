import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/register", UserController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  UserController.login
);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);

export default router;
