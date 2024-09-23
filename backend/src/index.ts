import "dotenv/config";
import config from "config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import createServer from "./utils/server";

const port = config.get<number>("port");

console.log(`Node.js version: ${process.version}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = createServer();

app.listen(port, async () => {
  logger.info(`App running in port ${port}`);

  await connect();
});
