const prod = {
  SOCKET_URL: "https://meta-void.ru:90",
  CALLBACK_URL: "https://meta-void.ru:91/",
}
const dev = {
  SOCKET_URL: "https://localhost:3001",
  CALLBACK_URL: "https://localhost:91/",
}

export const config = process.env.REACT_APP_STATUS === "dev" ? dev : prod
