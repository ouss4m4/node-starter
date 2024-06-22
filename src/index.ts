import "reflect-metadata";
import { app } from "./infra/http/app";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.error);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
