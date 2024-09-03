import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Results from './Results';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import { getToken, getMusicData } from './apiHandlerFunctions';

function App() {

  const [search, setSearch] = useState('');
  const [resultArray, setResultArray] = useState([]);


  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  /*
  useEffect(() => {
    document.getElementById("cardTitle").innerHTML = search;
  }, [search]);
  */


  const searchTitles = async (event) => {
    event.preventDefault();
    const token = await getToken();
    await getMusicData(token, search)
    .then((response) => setResultArray(response));
  };

  

  return (
    <div className="App">
      <Header />
      <SearchBar handleSearch={handleSearch} value={search} displayResult={searchTitles}/>
      <div className="mainContent">
        <Results displayResult={searchTitles} result={resultArray}/>
        <Playlist />
      </div>
    </div>
  );
}

export default App;
