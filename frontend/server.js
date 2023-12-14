const express = require("express")
const path = require("path")
const port = process.env.PORT || 80

const app = express()

// app.use(
//   helmet({
//     frameguard: false,
//   })
// )

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "build")))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.get("/ping", function (req, res) {
  return res.send("pong")
})

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

// app.get("/app", function (req, res) {
//   res.sendFile(path.join(__dirname, "build2", "index.html"))
// })

app.listen(port)

// ==============================
// var finalhandler = require("finalhandler")
// var http = require("http")
// var serveStatic = require("serve-static")

// // Serve up public/ftp folder
// var serve = serveStatic("build", { index: ["index.html", "index.htm"] })

// // Create server
// var server = http.createServer(function onRequest(req, res) {
//   serve(req, res, finalhandler(req, res))
// })

// // Listen
// server.listen(process.env.PORT || 81)
