const Rasp = require("../models/raspSchema")
const AsyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
//
const getRasp = async (req, res) => {
  const rasp = await Rasp.find({})
  console.log("yes get rasp")
  res.json(rasp)
}

const changeRaspById = AsyncHandler(async (req, res) => {
  let id = req.params.id
  let { name } = req.body
  let { time } = req.body
  let { aud } = req.body
  let { purpose } = req.body

  switch (purpose) {
    case "name":
      FindAndUpdName(name)
    case "time":
      FindAndUpdTime(time)
    case "aud":
      FindAndUpdAud(aud)
    default:
      break
  }

  async function FindAndUpdName(name) {
    await Rasp.updateOne(
      { "disciples._id": mongoose.Types.ObjectId(id) },
      { $set: { "disciples.$.name": name } }
    )
  }

  async function FindAndUpdTime(time) {
    await Rasp.updateOne(
      { "disciples._id": mongoose.Types.ObjectId(id) },
      { $set: { "disciples.$.time": time } }
    )
  }
  async function FindAndUpdAud(aud) {
    await Rasp.updateOne(
      { "disciples._id": mongoose.Types.ObjectId(id) },
      { $set: { "disciples.$.aud": aud } }
    )
  }

  res.json("OK")
  res.status(200)
})

const deleteDiscById = AsyncHandler(async (req, res) => {
  let _id = req.body.id
  let disc_id = req.body.disc_id

  let del = async () =>
    Rasp.updateOne(
      { _id: mongoose.Types.ObjectId(_id) },
      { $pull: { disciples: { _id: mongoose.Types.ObjectId(disc_id) } } }
    )

  del().then((result) => {
    res.json("delete OK")
    res.status(201)
  })
})

const pushDiscById = AsyncHandler(async (req, res) => {
  let dayid = req.params.id
  let name = req.body.name
  let time = req.body.time
  let aud = req.body.aud
  let objDisc = {
    name,
    time,
    aud,
  }

  let push = async () =>
    await Rasp.findOneAndUpdate(
      { id: dayid },
      { $push: { disciples: objDisc } }
    )

  push().then((result) => {
    res.json("push OK")
    res.status(202)
  })
})

module.exports = { getRasp, changeRaspById, deleteDiscById, pushDiscById }
