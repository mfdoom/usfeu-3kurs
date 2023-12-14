const prod = {
  SOCKET_URL: "https://metavoid.ru:90",
  CALLBACK_URL: "https://metavoid.ru:90/",
}
const dev = {
  SOCKET_URL: "http://localhost:3001",
  CALLBACK_URL: "http://localhost:90/",
}

export const config = process.env.REACT_APP_STATUS === "dev" ? dev : prod
