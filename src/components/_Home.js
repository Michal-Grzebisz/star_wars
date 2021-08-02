import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Character from './_Character'

const Home = () => {
    const [people, setPeople] = useState([])
    const [error, setError] = useState('')
    const [counter, setCounter] = useState(1)


    useEffect(() => {
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
         
        getList()
    }, []);
    



    const nextPage = () => {
        setCounter(counter => {
            let newCounter = counter + 1
            return setCounter(newCounter)
        })
    }

    const prevPage = () => {
        setCounter(counter => {
            let newCounter = counter - 1
            return setCounter(newCounter)
        })
    }


    return (
        <> 
    
            <button type="button" color="info" onClick={() => prevPage()}>Prev Page</button>
            <button type="button" color="info" onClick={() => nextPage()}>Next Page</button>
            <Container maxwidth='xs'>
            <h2>Characters</h2>
            <Character people={people} />
            <p>{error}</p>
            </Container>
        </>
    )
}

export default Home