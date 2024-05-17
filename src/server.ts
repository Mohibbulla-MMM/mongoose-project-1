import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    const url = config.database_url as string;
    await mongoose.connect(url);
    // todo .env file the import port
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
