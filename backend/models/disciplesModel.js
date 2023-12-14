const mongoose = require("mongoose")

const disciplesSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    aud: { type: String, required: false },
    time: { type: String, required: false },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
  },
  {
    timestamps: true,
  }
)

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

const Rasp = mongoose.model("raspSchema", raspSchema)

module.exports = Rasp
