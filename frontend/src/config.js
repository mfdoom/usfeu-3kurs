const prod = {
  SOCKET_URL: "http://metavoid.ru:90",
  CALLBACK_URL: "http://metavoid.ru:91/",
}
const dev = {
  SOCKET_URL: "http://localhost:3001",
  CALLBACK_URL: "http://localhost:91/",
}

export const config = process.env.REACT_APP_STATUS === "dev" ? dev : prod
