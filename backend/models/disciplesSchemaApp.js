const mongoose = require("mongoose")

const disciplesSchemaApp = mongoose.Schema(
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

module.exports = disciplesSchemaApp
