require("dotenv").config()
const prod = {
  CLIENT_URL: "https://meta-void.ru/webdev",
  CALLBACK_URL: "https://meta-void.ru:91/",
}
const dev = {
  CLIENT_URL: "http://localhost:3000/webdev",
  CALLBACK_URL: "http://localhost:91/",
}
//
const config = process.env.NODE_ENV === "dev" ? dev : prod

module.exports = config
