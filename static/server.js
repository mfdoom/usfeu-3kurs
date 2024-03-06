var express = require("express")
var app = express()
const path = require("path")

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Cache-Control", "no-cache")

  next()
})

// app.get("/", function (request, response) {
//   response.status(404).send("Not Found")
// })

app.use("/webdev", express.static("../frontend/build"))

// app.get("/webdev", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

app.listen(80, console.log(`server is running at 80 port`))

// const fs = require("fs")
// const https = require("https")
// const express = require("express")
// const app = express()
// app.use(express.static("../front/build"))

// app.get("/", function (req, res) {
//   return res.end("Serving static files!")
// })

// const server = https.createServer(
//   {
//     key: fs.readFileSync("../ssl/privkey.pem"),
//     cert: fs.readFileSync("../ssl/fullchain.pem"),
//   },
//   app
// )
// server.listen(443, () => {
//   console.log(`Serving on port 443`)
// })
