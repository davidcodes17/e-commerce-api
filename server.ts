import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import db from "./src/config/db";

/*
DATABSE CONNECTION
*/

db.sync({ force: false })
  .then(() => console.log("Synced 😎"))
  .catch((err: any) => console.log(err));

const {PORT} = process.env
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

