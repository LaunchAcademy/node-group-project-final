import React, { useEffect, useState } from 'react';
import NewAdoptionForm from './NewAdoptionForm';

const PetShow = (props) => {
  const [pet, setPet] = useState([])
  const [showForm, setShowForm] = useState(false)
  const petType = props.match.params.petType
  const petId = props.match.params.petId
  
  const fetchPet = async () => {
    try {
      const response = await fetch(`/api/v1/pet-types/${petType}/${petId}`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const petData = await response.json()
      setPet(petData.pet)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPet()
  }, [])

  if(!pet) {
    return(
      <h1>That Pet could not be found!</h1>
    )
  } else {
    const { name, imgUrl, age, vaccinationStatus, adoptionStory, availableForAdoption } = pet
  
    let vaccinationStatusText = "No";
    if(vaccinationStatus) {
      vaccinationStatusText = "Yes"
    }
  
    let availableForAdoptionText = "No";
    if(availableForAdoption) {
      availableForAdoptionText = "Yes"
    }
  
    let adoptionStoryTag;
    if(adoptionStory) {
      adoptionStoryTag = <p><strong>Adoption Story: </strong>{adoptionStory}</p>
    }

    let newAdoptionApplicationForm
    if(showForm) {
      newAdoptionApplicationForm = <NewAdoptionForm />
    }

    const handleAdoptButtonClick = event => {
      event.preventDefault()
      setShowForm(true)
    }

    // const postAdoptionApp = async () => {
    //   try {
    //     const response = await fetch('/api/v1/adoption-applications', {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Content-Type': 'application/json'
    //       }),
    //       body: JSON.stringify(formPayload)
    //     })
    //     if (!response.ok) {
    //       if(response.status === 422) {
    //         const body = await response.json()
    //         return setErrors(body.errors)
    //       } else {
    //         const errorMessage = `${response.status} (${response.statusText})`
    //         const error = new Error(errorMessage)
    //         throw(error)
    //       }
    //     }
    //     
    //     setErrors({})
    //     setSuccessfulSubmission(true)
    //   } catch(err) {
    //     console.error(`Error in fetch: ${err.message}`)
    //   }
    // }
  
    return (
      <div>
        <img src={imgUrl} width="40%" />
        <h1>{name}</h1>
        <p><strong>Age: </strong>{age}</p>
        <p><strong>Vaccinated?: </strong>{vaccinationStatusText}</p>
        <p><strong>Available For Adoption?: </strong>{availableForAdoptionText}</p>
        {adoptionStoryTag}
        <button type="button" className="button" onClick={handleAdoptButtonClick}>Adopt Me!</button>
        {newAdoptionApplicationForm}
      </div>
    )
  }
}

export default PetShow