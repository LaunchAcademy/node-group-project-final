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

petTypesRouter.get("/:petType", async (req, res) => {
  try {
    const petType = await PetType.findByType(req.params.petType)
    if(petType) {
      const pets = await petType.pets()
      return res.status(200).json({ pets })
    } else {
      return res.status(404).json({ errors: "That pet type does not exist" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

petTypesRouter.get("/:petType/:petId", async (req, res) => {
  try {
    const petType = await PetType.findByType(req.params.petType)
    if(petType) {
      const pets = await petType.pets()
      const specificPet = pets.filter(pet => pet.id == req.params.petId)
      if(specificPet.length > 0) {
        return res.status(200).json({ pet: specificPet[0] })
      } else {
        return res.status(404).json({ errors: "That pet does not exist under this pet type" })
      }
    } else {
      return res.status(404).json({ errors: "That pet type does not exist" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default petTypesRouter