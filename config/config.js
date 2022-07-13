const config = new URL(
  process.env.DATABASE_URL ||
    "postgres://postgres:12345678@127.0.0.1:5432/final_project"
);

const path = require("path");

const {
  DB_USER = config.username,
  DB_PASSWORD = config.password,
  DB_NAME = config.pathname.replace("/", ""),
  DB_HOST = config.hostname,
  DB_PORT = "5432",
} = process.env;

// console.log(process.env);
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    storage: path.resolve(__dirname, "../node_modules/test.sqlite"),
    dialect: "sqlite",
    logging: false,
  },
  production: {
    use_env_variable: `DATABASE_URL`,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    dialect: "postgres",
  },
};
