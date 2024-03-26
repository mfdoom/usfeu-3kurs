require("dotenv").config()
const config = require("./config.js")
const PORT = 91
const connectDb = require("./config/db.js")
const CLIENT_URL = `${config.CLIENT_URL}`
const { notFound, errorHandler } = require("./middleware/errorMiddleWare.js")
const { createServer } = require("http")
const { Server } = require("socket.io")
const morgan = require("morgan")
const discRoutes = require("./routes/discRoutes.js")

connectDb()
//
var express = require("express"),
  passport = require("passport"),
  util = require("util"),
  VkStrategy = require("passport-vk-strategy").Strategy
//

var VK_APP_ID = process.env.VK_APP_ID
var VK_APP_SECRET = process.env.VK_APP_SECRET

if (!VK_APP_ID || !VK_APP_SECRET) {
  throw new Error("Set VK_APP_ID and VK_APP_SECRET env vars")
}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new VkStrategy(
    {
      clientID: VK_APP_ID,
      clientSecret: VK_APP_SECRET,
      callbackURL: `${config.CALLBACK_URL}auth/vk/callback`,
      scope: [],
      profileFields: [],
      lang: "ru",
    },
    function verify(accessToken, refreshToken, params, profile, done) {
      process.nextTick(function () {
        return done(null, profile)
      })
    }
  )
)

var app = express()

const cors = require("cors")

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: ["*"],
  },
}).listen(3001)

app.use(
  cors({
    credentials: true,
    origin: true,
  })
)

app.use(morgan("dev"))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(require("cookie-parser")())
app.use(require("body-parser")())
app.use(require("express-session")({ secret: "keyboard cat" }))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", function (req, res) {
  res.json({ user: req.user })
})

app.use("/api/rasp", discRoutes)

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect(CLIENT_URL)
  })
})

app.get("/auth/login/success", async (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else res.status(201).json("no user")
})

app.get("/account", ensureAuthenticated, function (req, res) {
  res.render("account", { user: req.user })
})

app.get("/login", function (req, res) {
  res.render("login", { user: req.user })
})

app.get("/auth/vk", passport.authenticate("vkontakte"), function (req, res) {})

app.get(
  "/auth/vk/callback",
  passport.authenticate("vkontakte", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/")
  }
)

app.get("/logout", function (req, res) {
  req.logout()
  res.redirect("/")
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

app.use(errorHandler)

app.listen(PORT, console.log(`server is running at ${PORT} port`))
