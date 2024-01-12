const Member = require('../models/Member')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllMembers = asyncWrapper(async (req, res) => {
  const members = await Member.find({})
  res.status(200).json({ members })
})

const createMember = asyncWrapper(async (req, res) => {
  const member = await Member.create(req.body)
  res.status(201).json({ member })
})

const getMember = asyncWrapper(async (req, res, next) => {
  const { id: memberID } = req.params
  const member = await Member.findOne({ _id: memberID })
  if (!member) {
    return next(createCustomError(`No member with id : ${memberID}`, 404))
  }
  res.status(200).json({ member })
})


const deleteMember = asyncWrapper(async (req, res, next) => {
  const { id: memberID } = req.params
  const member = await Member.findOneAndDelete({ _id: memberID })
  if (!member) {
    return next(createCustomError(`No task with id : ${memberID}`, 404))
  }
  res.status(200).json({ member })
})


const updateMember = asyncWrapper(async (req, res, next) => {
  const { id: memberID } = req.params

  const member = await Member.findOneAndUpdate({ _id: memberID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!member) {
    return next(createCustomError(`No task with id : ${memberID}`, 404))
  }
  res.status(200).json({ member })
})

module.exports = {
  getAllMembers,
  createMember,
  getMember,
  updateMember,
  deleteMember,
}
