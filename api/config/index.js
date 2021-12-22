const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: "mongodb+srv://sadkat69:sadkat69@cluster0.p8o82.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    COOKIE_NAME: "SESSION_DATA",
    TOKEN_SECRET: "i love petting little pussies",
    SALT_ROUNDS: 10,
    CORS: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  },
};

module.exports = config[env];