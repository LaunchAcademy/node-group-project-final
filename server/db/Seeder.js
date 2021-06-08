import pg from "pg"
import PetType from "../models/PetType.js"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_development" })

class Seeder {
  static async seed() {
    const petTypes = [
      {
        type: "Dog",
        imgUrl: "https://images.unsplash.com/photo-1601758124277-f0086d5ab050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1052&q=80",
        description: "Man's Best Friend"
      },
      {
        type: "Cat",
        imgUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
        description: "Cat's Best Friend"
      },
      {
        type: "Fish",
        imgUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
      }
    ]

    for(let i = 0; i < petTypes.length; i++) {
      const newPetType = new PetType(petTypes[i])
      const persistedPetType = await newPetType.save()
      console.log(`Pet type  ${i+1} seeded: ${persistedPetType}`);
    }
  }
}

export default Seeder
