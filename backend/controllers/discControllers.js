const Rasp = require("../models/disciplesModel.js")
const AsyncHandler = require("express-async-handler")
const mongoose = require("mongoose")

const getRasp = AsyncHandler(async (req, res) => {
  const rasp = await Rasp.find({})
  res.json(rasp)
})

const changeRaspById = AsyncHandler(async (req, res) => {
  let id = req.params.id
  let { name } = req.body
  let { time } = req.body
  let { aud } = req.body
  let { purpose } = req.body
  // let item
  // mongoose.Types.ObjectId("6579ca91c66e5e4efa621014")
  // console.log(id)

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
  // const rasp = await Rasp.find({})

  res.json("OK")
  res.status(200)
})

const deleteDiscById = AsyncHandler(async (req, res) => {
  let _id = req.body.id
  let disc_id = req.body.disc_id
  console.log(_id, disc_id)
  let del = async () =>
    Rasp.updateOne(
      { _id: mongoose.Types.ObjectId(_id) },
      { $pull: { disciples: { _id: mongoose.Types.ObjectId(disc_id) } } }
    )
  // res.json(rasp)
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
  console.log(dayid, name, time, aud)
  let push = async () =>
    await Rasp.findOneAndUpdate(
      { id: dayid },
      { $push: { disciples: objDisc } }
    )
  // res.json(rasp)

  // People.findOneAndUpdate(
  //    { _id: req.body.id },
  //    { $push: { friends: objFriends  } },
  //   function (error, success) {
  //         if (error) {
  //             console.log(error);
  //         } else {
  //             console.log(success);
  //         }
  //     });

  push().then((result) => {
    res.json("push OK")
    res.status(202)
  })
})

module.exports = { getRasp, changeRaspById, deleteDiscById, pushDiscById }
