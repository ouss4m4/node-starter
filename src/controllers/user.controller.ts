import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  static async register(req: Request, res: Response) {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    const userExists = await userRepository.findOneBy({ username });

    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    return res.status(201).send({ message: "User created successfully" });
  }

  static async login(req: Request, res: Response) {
    res.send("Logged in");
  }

  static async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.find();
    return res.status(200).send(users);
  }

  static async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await userRepository.remove(user);

    return res.status(200).send({ message: "User deleted successfully" });
  }
}
