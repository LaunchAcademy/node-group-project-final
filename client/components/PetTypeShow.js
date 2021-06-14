import React, { useEffect, useState } from 'react';

import PetTile from "./PetTile"

const PetTypeShow = props => {
  const [petType, setPetType] = useState(
    { pets: [] }
  )
  
  const fetchPets = async () => {
    try {
      const petTypeId = props.match.params.id
      const response = await fetch(`/api/v1/pet-types/${petTypeId}`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const petTypeData = await response.json()
      setPetType(petTypeData.petType)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const petTiles = petType.pets.map(pet => {
    return (
      <PetTile
        key={pet.id}
        pet={pet}
      />
    )
  })

  return(
    <div>
      <h1>{petType.name}</h1>
      {petTiles}
    </div>
  )
}

export default PetTypeShow