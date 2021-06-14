import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_development"
})

class PetType {
  constructor({ id, name, imgUrl, img_url, description }) {
    this.id = id
    this.name = name
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

  static async findByName(name) {
    try {
      const result = await pool.query("SELECT * FROM pet_types WHERE name = $1", [name])
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

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM pet_types WHERE id = $1", [id])
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
      const query = "INSERT INTO pet_types (name, img_url, description) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(query, [this.name, this.imgUrl, this.description])
  
      this.id = result.rows[0].id
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async pets() {
    const petFile = await import("./Pet.js")
    const Pet = petFile.default

    try {
      const query = `SELECT * FROM pets WHERE pet_type_id = $1;`
      const result = await pool.query(query, [this.id])

      const relatedAdoptablePetsData = result.rows
      const relatedAdoptablePets = relatedAdoptablePetsData.map(pet => new Pet(pet))

      return relatedAdoptablePets
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async getAvailablePets() {
    const petFile = await import("./Pet.js")
    const Pet = petFile.default

    try {
      const query = `SELECT * FROM pets WHERE pet_type_id = $1 AND available_for_adoption = true;`
      const result = await pool.query(query, [this.id])

      const relatedAdoptablePetsData = result.rows
      const relatedAdoptablePets = relatedAdoptablePetsData.map(pet => new Pet(pet))

      return relatedAdoptablePets
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default PetType