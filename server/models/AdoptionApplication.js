import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_development"
})

class AdoptionApplication {
  constructor({ id, name, phoneNumber, phone_number, email, homeStatus, home_status, applicationStatus, application_status, petId, pet_id  }) {
    this.id = id
    this.name = name
    this.email = email
    this.phoneNumber = phoneNumber || phone_number
    this.homeStatus = homeStatus || home_status
    this.applicationStatus = applicationStatus || application_status || "pending"
    this.petId = petId || pet_id
  }

  isValid() {
    this.errors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
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
      debugger
      try {
        const query = "INSERT INTO adoption_applications (name, phone_number, email, home_status, application_status, pet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
        const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.homeStatus, this.applicationStatus, this.petId])

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

export default AdoptionApplication