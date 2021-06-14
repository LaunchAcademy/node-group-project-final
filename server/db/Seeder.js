import PetType from "../models/PetType.js"
import Pet from "../models/Pet.js"

class Seeder {
  static async seed() {
    const petTypes = [
      {
        name: "Dog",
        imgUrl: "https://images.unsplash.com/photo-1601758124277-f0086d5ab050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1052&q=80",
        description: "Man's Best Friend"
      },
      {
        name: "Cat",
        imgUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
        description: "Cat's Best Friend"
      },
      {
        name: "Fish",
        imgUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
      }
    ]

    for(let i = 0; i < petTypes.length; i++) {
      const newPetType = new PetType(petTypes[i])
      const persistedPetType = await newPetType.save()
      console.log(`Pet type ${i+1} seeded: ${persistedPetType}`);
    }

    const dogType = await PetType.findByName("Dog")
    const catType = await PetType.findByName("Cat")

    const pets = [
      {
        name: "Rory",
        imgUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        age: 5,
        vaccinationStatus: true,
        availableForAdoption: false,
        petTypeId: dogType.id
      },
      {
        name: "Finn",
        imgUrl: "https://images.unsplash.com/photo-1553882809-a4f57e59501d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        age: 1,
        vaccinationStatus: false,
        adoptionStory: "The sweetest little bundle of joy in need of a loving home",
        availableForAdoption: true,
        petTypeId: dogType.id
      }
      ,
      {
        name: "Maisy",
        imgUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        age: 3,
        vaccinationStatus: true,
        adoptionStory: "Neighborhood kitten looking for a family",
        availableForAdoption: true,
        petTypeId: catType.id
      }
    ]

    for(let i = 0; i < pets.length; i++) {
      const newPet = new Pet(pets[i])
      const persistedPet = await newPet.save()
      console.log(`Pet ${i+1} seeded: ${persistedPet}`);
    }
  }
}

export default Seeder
