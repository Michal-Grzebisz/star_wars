import React, { useState } from 'react'

const CharacterItem = ({people, rowName}) => {

 

    const eachPeople = people.map(item => item.name)

    console.log(rowName)

    return (
        <>  
            <h2>{eachPeople}</h2>
            <h1></h1>
        </>
    )
}

export default CharacterItem