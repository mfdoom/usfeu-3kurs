const express = require("express")
const router = express.Router()
//
const {
  getRaspApp,
  // changeRaspById,
  // deleteDiscById,
  // pushDiscById,
} = require("../controllers/discControllersApp.js")

router.route("/").get(getRaspApp)
// router.route("/:id").post(changeRaspById)
// router.route("/delete/:id").post(deleteDiscById)
// router.route("/push/:id").post(pushDiscById)

module.exports = router
