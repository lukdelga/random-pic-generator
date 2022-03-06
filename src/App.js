import Generator from "./Generator";
import './App.css'
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

function App() {
  //Gets Dog img url from Dog API
  async function DogApiHandler() {
    let data = await fetch('https://dog.ceo/api/breeds/image/random')
    .then(Promise => Promise.json() )
    .then(obj => obj.message);
    return data;
  }
  async function CatApiHandler() {
    //Gets Cat img url from Cat API
      let data = await fetch('https://api.thecatapi.com/v1/images/search')
      .then(Promise => Promise.json())
      .then(obj => obj[0].url);
      return data;
  }

  async function FoxApiHandler() {
    let data = await fetch('https://randomfox.ca/floof/')
    .then(Promise => Promise.json())
    .then(obj => obj.image)
    return data;
  }

  async function RandomApiHandler() {
    let data = await fetch('https://source.unsplash.com/450x550/?random')
    .then(Promise => Promise.url)
    return data
  }

  async function dispatch(action) {
    let aux;
    switch(action) {
      case 'Dog':
        aux = await DogApiHandler();
        updateDog(aux);
        break   
      case 'Cat':
        aux = await CatApiHandler();
        updateCat(aux);
        break
        case 'Random':
          aux = await RandomApiHandler();
          console.log(aux);
          updateRandom(aux);
          break
        case 'Fox':
          aux = await FoxApiHandler();
          updateFox(aux);
          break
    }
  }

  

  const [catUrl, updateCat] = useState('');
  const [dogUrl, updateDog] = useState('');
  const [RandomUrl, updateRandom] = useState('');
  const [foxUrl, updateFox] = useState('');
  const [searchVal, updateSearch] = useState('')
  
  return (
    <div>
      <Navbar bg='primary' variant='dark' sticky="top">
        <Container>
        <Navbar.Brand style={{fontFamily: 'Lobster', fontSize: '2.3em'}}>RandomPicGenerator</Navbar.Brand>
        <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchVal}
          onChange={(e) => updateSearch(e.target.value)}
        />
        <Button variant="light">Search</Button>
      </Form>
        </Container>
      </Navbar>
      <div id='main-div'>
        {'dog'.includes(searchVal.toLowerCase()) && <Generator id='Dog' key={'Dog'} imgSrc={dogUrl} name={'Dog'} 
        func={dispatch}/>}
        {'cat'.includes(searchVal.toLowerCase()) && <Generator id='Cat' key={'Cat'} imgSrc={catUrl} name={'Cat'} 
        func={dispatch}/>}
        {'fox'.includes(searchVal.toLowerCase()) && <Generator id='Fox' key={'Fox'} imgSrc={foxUrl} name={'Fox'} 
        func={dispatch}/>}
        {'random'.includes(searchVal.toLowerCase()) && <Generator id='Random' key={'Random'} imgSrc={RandomUrl} 
        name={'Random'} func={dispatch}/>}
      </div>
    </div>
  );
}

export default App;