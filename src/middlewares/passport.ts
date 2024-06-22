import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

// Ensure to use bcrypt for password hashing
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneBy({ username });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Use bcrypt to compare hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
