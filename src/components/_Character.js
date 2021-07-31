import React from 'react'

const Character = ({ people }) => {

    return (
        <>
            <p>Imie: {people.name}</p>
            <p>Wzrost: {people.height}</p>
            <p>Waga: {people.mass}</p>
            <p>Kolor wlosow: {people.hair_color}</p>
            <p>Kolor skory: {people.skin_color}</p>
        </>
    )
}

export default Character