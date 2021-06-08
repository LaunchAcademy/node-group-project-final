import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_development"
})

class PetType {
  constructor({ id, type, imgUrl, img_url, description }) {
    this.id = id
    this.type = type
    this.imgUrl = imgUrl || img_url
    this.description = description
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM pet_types;")

      const petTypeData = result.rows
      const petTypes = petTypeData.map(petType => new PetType(petType))
      
      return petTypes
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  static async findByType(type) {
    try {
      const result = await pool.query("SELECT * FROM pet_types WHERE type = $1", [type])
      if(result.rows.length > 0) {
        return new PetType(result.rows[0])
      } else {
        return null
      }
    }
    catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async save() {
    try {
      const query = "INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(query, [this.type, this.imgUrl, this.description])
  
      this.id = result.rows[0].id
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async pets() {
    const petFile = await import("./AdoptablePet.js")
    const AdoptablePet = petFile.default

    try {
      const query = `SELECT * FROM adoptable_pets WHERE pet_type_id = $1;`
      const result = await pool.query(query, [this.id])

      const relatedAdoptablePetsData = result.rows
      const relatedAdoptablePets = relatedAdoptablePetsData.map(pet => new AdoptablePet(pet))

      return relatedAdoptablePets
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default PetType