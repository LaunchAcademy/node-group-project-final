import express from "express"

import Pet from "../../../models/Pet.js"
import AdoptionApplication from "../../../models/AdoptionApplication.js"

const petsRouter = new express.Router()

petsRouter.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
    if(pet) {
      return res.status(200).json({ pet })
    } else {
      return res.status(404).json({ errors: "That pet does not exist" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

petsRouter.post("/", async (req, res) => {
  try {
    const pet = new Pet(req.body)
    const persisted = await pet.save()
    if(persisted) {
      res.status(201).json({ pet })
    } else {
      res.status(422).json({ errors: pet.errors })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

petsRouter.post("/:petId/adoption-applications", async (req, res) => {
  try {
    const adoptionApplication = new AdoptionApplication(req.body)
    adoptionApplication.petId = req.params.petId
    debugger;
    const persisted = await adoptionApplication.save()
    if(persisted) {
      res.status(201).json({ adoptionApplication })
    } else {
      res.status(422).json({ errors: adoptionApplication.errors })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default petsRouter