const mongoose = require("mongoose")
const disciplesSchema = require("./disciplesSchema")

const raspSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: "",
    },
    disciples: [disciplesSchema],
  },
  {
    timestamps: true,
  }
)

const Rasp = mongoose.model("Rasp", raspSchema)

module.exports = Rasp
