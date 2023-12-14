const mongoose = require("mongoose")
const dotenv = require("dotenv")
const disciples = require("./data/disciples.js")
const connectDB = require("./config/db.js")
const Rasp = require("./models/disciplesModel.js")

dotenv.config()

connectDB()

const destroyData = async () => {
  try {
    await Rasp.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

destroyData()
