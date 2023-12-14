const express = require("express")
const router = express.Router()

const { getRasp, changeRaspById } = require("../controllers/discControllers.js")

router.route("/").get(getRasp)
router.route("/:id").post(changeRaspById)

module.exports = router
