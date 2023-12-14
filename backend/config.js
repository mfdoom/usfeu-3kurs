require("dotenv").config()
const prod = {
  CLIENT_URL: "https://metavoid.ru",
  CALLBACK_URL: "https://metavoid.ru:90/",
}
const dev = {
  CLIENT_URL: "http://localhost:3000",
  CALLBACK_URL: "http://localhost:90/",
}

const config = process.env.NODE_ENV === "dev" ? dev : prod

module.exports = config
