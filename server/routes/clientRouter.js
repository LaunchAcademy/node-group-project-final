import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/pets", "/pets/:petType", "/pets/:petType/:petId"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
