import express from "express";
import PassportStrategy from "../../middlewares/passport";
import userRouter from "../../routes/user.router";
export const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use(PassportStrategy.initialize());
