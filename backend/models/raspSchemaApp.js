const mongoose = require("mongoose")
const disciplesSchemaApp = require("./disciplesSchemaApp")

const raspSchemaApp = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: "",
    },
    disciples: [disciplesSchemaApp],
  },
  {
    timestamps: true,
  }
)

const RaspApp = mongoose.model("RaspApp", raspSchemaApp)

module.exports = RaspApp
