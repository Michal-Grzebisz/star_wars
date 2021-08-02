import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from 'react-router-dom'
import Home from './components/_Home'
import CharacterItem from './components/_CharacterItem'

function App() {

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

  const [rowName, setRowName] = useState('')
  
  const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name', width: 200, renderCell: (params) => (
        <Link to={rowName} onClick={(e) => {  localStorage.setItem('myValueInLocalStorage', e.target.textContent);
          setRowName(e.currentTarget.textContent)}
        } >{params.value}</Link>
    )},
    {field: 'height', headerName: 'Height', width: 200},
    {field: 'mass', headerName: 'Mass', width: 200},
    {field: 'hair_color', headerName: 'Hair Color', width: 200},
  ]

  console.log(rowName)


  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home people={people} error={error} counter={counter} columns={columns} rowName={rowName}/>
        </Route>
        <Route exact path={rowName}>
          <CharacterItem people={people} rowName={rowName} />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;
