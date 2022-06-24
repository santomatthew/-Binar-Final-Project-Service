const config = new URL(
  process.env.DATABASE_URL ||
    "postgres://postgres:12345678@127.0.0.1:5432/final_project"
);

const {
  DB_USER = config.username,
  DB_PASSWORD = config.password,
  DB_NAME = config.pathname.replace("/", ""),
  DB_HOST = config.hostname,
  DB_PORT = "5432",
} = process.env;

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
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
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
