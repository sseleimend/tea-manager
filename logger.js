import winston from "winston";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const transports = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({
    level: "info",
    filename: path.join(dirname, "info.log"),
    format: winston.format.json(),
  }),
  new winston.transports.File({
    level: "error",
    filename: path.join(dirname, "error.log"),
    format: winston.format.json(),
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] : ${info.message}`
    )
  ),
  transports: transports,
});

export default logger;
