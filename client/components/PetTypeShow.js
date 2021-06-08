import React, { useEffect, useState } from 'react';

import PetTile from "./PetTile"

const PetTypeShow = props => {
  const [pets, setPets] = useState([])
  const petType = props.match.params.petType
  
  const fetchPets = async () => {
    try {
      const response = await fetch(`/api/v1/pet-types/${petType}`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const petsData = await response.json()
      setPets(petsData.pets)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const petTiles = pets.map(pet => {
    return (
      <PetTile
        key={pet.id}
        petType={petType}
        pet={pet}
      />
    )
  })

  return(
    <div>
      {petTiles}
    </div>
  )
}

export default PetTypeShow