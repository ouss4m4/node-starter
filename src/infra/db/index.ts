import { AppDataSource } from "../../config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.error);
