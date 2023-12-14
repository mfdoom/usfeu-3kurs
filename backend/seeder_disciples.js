const mongoose = require("mongoose")
const dotenv = require("dotenv")
const disciples = require("./data/disciples.js")
const connectDB = require("./config/db.js")
const Rasp = require("./models/disciplesModel.js")

dotenv.config()

connectDB()

const importData = async () => {
  try {
    const sampleDisc = disciples.map((hex) => {
      return { ...hex }
    })
    await Rasp.insertMany(sampleDisc)
    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importData()
