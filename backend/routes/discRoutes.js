const express = require("express")
const router = express.Router()

const {
  getRasp,
  changeRaspById,
  deleteDiscById,
} = require("../controllers/discControllers.js")

router.route("/").get(getRasp)
router.route("/:id").post(changeRaspById)
router.route("/delete/:id").post(deleteDiscById)

module.exports = router
