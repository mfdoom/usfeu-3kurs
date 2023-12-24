const express = require("express")
const router = express.Router()

const {
  getRasp,
  changeRaspById,
  deleteDiscById,
  pushDiscById,
} = require("../controllers/discControllers.js")

router.route("/").get(getRasp)
router.route("/:id").post(changeRaspById)
router.route("/delete/:id").post(deleteDiscById)
router.route("/push/:id").post(pushDiscById)

module.exports = router
