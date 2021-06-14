import express from "express"

import PetType from "../../../models/PetType.js"

const petTypesRouter = new express.Router()

petTypesRouter.get("/", async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    return res.status(200).json({ petTypes })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

petTypesRouter.get("/:id", async (req, res) => {
  try {
    const petType = await PetType.findById(req.params.id)
    if(petType) {
      petType.pets = await petType.getAvailablePets()
      return res.status(200).json({ petType })
    } else {
      return res.status(404).json({ errors: "That pet type does not exist" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default petTypesRouter