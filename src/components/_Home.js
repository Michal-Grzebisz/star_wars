import React, { useState, useEffect } from 'react'
import Character from './_Character'


const Home = () => {
    const [people, setPeople] = useState([])
    const [error, setError] = useState('')
    const [counter, setCounter] = useState(1)

    const getList = () => {
        fetch(`https://swapi.dev/api/people/?page=${counter}&format=json`)
        .then(resp => resp.json())
        .then(data => {
            setPeople(data.results);
        })
        .catch(() => {
            setError("Problem z serwerem");
        })
    }

    useEffect(() => getList(), [])

    const nextPage = () => {
        setCounter(counter => {
            let newCounter = counter + 1
            return setCounter(newCounter)
        })
        
        
        getList()
    }

    const prevPage = () => {
        setCounter(counter => {
            let newCounter = counter - 1
            return setCounter(newCounter)
        })
    
        
        getList()
    }


    return (
        <> 
        <button onClick={() => prevPage()}>Prev Page</button>
        <button onClick={() => nextPage()}>Next Page</button>
        <h2>Characters</h2>
            {
                people.map(item => <Character people={item} key={item.name} />)
            }
            <p>{error}</p>
        </>
    )
}

export default Home