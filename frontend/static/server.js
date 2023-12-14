var express = require("express")
var cors = require("cors")
var app = express()

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

app.use(express.static("../front/build"))

app.listen(80, console.log(`server is running at 80 port`))
