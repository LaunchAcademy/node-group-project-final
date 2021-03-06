import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_development"
})

class Pet {
  constructor({ id, name, imgUrl, img_url, age, vaccinationStatus, vaccination_status, adoptionStory, adoption_story, availableForAdoption, available_for_adoption, petTypeId, pet_type_id  }) {
    this.id = id
    this.name = name
    this.age = age
    this.imgUrl = imgUrl || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption
    this.petTypeId = petTypeId || pet_type_id
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM pets;")

      const petsData = result.rows
      const pets = petsData.map(pet => new Pet(pet))
      
      return pets
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM pets WHERE id = $1", [id])
      if(result.rows.length > 0) {
        return new Pet(result.rows[0])
      } else {
        return null
      }
    }
    catch(err) {
      console.log(err)
      throw(err)
    }
  }

  isValid() {
    this.errors = {}
    const requiredFields = ["name", "imgUrl"]
    let isValid = true

    for(const requiredField of requiredFields) {
      this.errors[requiredField] = []
      if(!this[requiredField]) {
        isValid = false
        this.errors[requiredField] = "can't be blank"
      }
    }
    return isValid
  }

  async save() {
    if(this.isValid()) {
      delete this.errors
      try {
        const query = "INSERT INTO pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
        const result = await pool.query(query, [this.name, this.imgUrl, this.age, this.vaccinationStatus, this.adoptionStory, this.availableForAdoption, this.petTypeId])
    
        this.id = result.rows[0].id

        return true
      } catch(err) {
        console.log(err)
        throw(err)
      }
    } else {
      return false
    }
  }
}

export default Pet