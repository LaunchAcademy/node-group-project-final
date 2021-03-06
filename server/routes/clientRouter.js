import express from "express"

const router = new express.Router()

const clientRoutes = [
  "/", 
  "/pet-types", 
  "/pet-types/:id", 
  "/pets/:id", 
  "/pets/new"
]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
