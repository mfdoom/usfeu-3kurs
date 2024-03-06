// var express = require("express")
// var cors = require("cors")
// var app = express()

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   )
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
//   res.setHeader("Access-Control-Allow-Credentials", true)
//   res.setHeader("Cache-Control", "no-cache")

//   next()
// })

// app.use(express.static("../front/build"))

// app.listen(80, console.log(`server is running at 80 port`))

const fs = require("fs")
const https = require("https")
const express = require("express")
const app = express()
const path = require("path")

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Cache-Control", "public, max-age=31557600") // 1 year

  next()
})

app.use("/webdev", express.static("../frontend/build"))

app.get("/test", function (req, res) {
  return res.end("Serving static files!")
})

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

const server = https.createServer(
  {
    key: fs.readFileSync("../ssl/privkey.pem"),
    cert: fs.readFileSync("../ssl/fullchain.pem"),
  },
  app
)

server.listen(443, () => {
  console.log(`Serving on port 443`)
})
