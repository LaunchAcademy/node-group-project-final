import React from 'react'

const PetTypeTile = (props) => {
  const { type, imgUrl, description } = props.petType

  let descriptionTag;
  if(description) {
    descriptionTag = <p>{description}</p>
  }

  return (
    <div>
      <a href={`/pets/${type}`}>
        <img src={imgUrl} width="30%" />
        <h1>{type}</h1>
      </a>
      {descriptionTag}
    </div>
  )
}

export default PetTypeTile