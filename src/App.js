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
  const [playlistArray, setPlaylistArray] = useState([]);


  // state to hold the search term
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // function to search for music titles
  const searchTitles = async (event) => {
    event.preventDefault();
    const token = await getToken();
    await getMusicData(token, search)
    .then((response) => setResultArray(response));
  };

  // function to add a song to the playlist
  const addSong = (event) => {
    event.preventDefault();
    const target = event.target.parentElement
    const songToAdd = resultArray.filter((item) => item === target);
    alert(target);
    setPlaylistArray([...playlistArray, target]);
    //alert(target);
  }

    return (
    <div className="App">
      <Header />
      <SearchBar handleSearch={handleSearch} value={search} displayResult={searchTitles}/>
      <div className="mainContent">
        <Results result={resultArray} addSong={addSong}/>
        <Playlist result={playlistArray}/>
      </div>
    </div>
  );
}

export default App;
