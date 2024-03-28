const express = require("express")
const router = express.Router()
//
const {
  getRaspApp,
  changeRaspByIdApp,
  deleteDiscByIdApp,
  pushDiscByIdApp,
} = require("../controllers/discControllersApp.js")

router.route("/").get(getRaspApp)
router.route("/:id").post(changeRaspByIdApp)
router.route("/delete/:id").post(deleteDiscByIdApp)
router.route("/push/:id").post(pushDiscByIdApp)

module.exports = router
