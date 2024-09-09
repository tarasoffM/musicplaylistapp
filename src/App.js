import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Results from './Results';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import Login from './Login';
import { getToken, getMusicData, postPlaylist , redirect, postSongs } from './apiHandlerFunctions';

function App() {

  const [search, setSearch] = useState('');
  const [resultArray, setResultArray] = useState([]);
  const [playlistArray, setPlaylistArray] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');

  //const authenticated = localStorage.getItem('token') ? true : false;
  
  //localStorage.setItem('code', '');
  //localStorage.setItem('token', '');

  // check to see if we're in the callback URL and if so, get the code
  const authenticate = async () => {

    const querySring = window.location.search;
    
    if (querySring.includes('code')) {
      getCode();
      await getToken(localStorage.getItem('code'))
      .then((token) => localStorage.setItem('token', token));

      return localStorage.getItem('token');
    }
  };

  // get the code from the URL
  const getCode = () => {
    const param = new URLSearchParams(window.location.search);
    const code = param.get('code');
    localStorage.setItem('code', code);

    window.history.pushState('', '', 'http://localhost:3000/');
  };

  // handle the login
  const handleLogin = () => {
    redirect();
  };

  // state to hold the search term
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // statful function to handle the playlist name
  const handlePlaylistName = (event) => {
    event.preventDefault();
    setPlaylistName(event.target.value);
    
  };

  // function to search for music titles
  const searchTitles = async (event) => {
    event.preventDefault();
    //const token = localStorage.getItem('token');
    // const token = await getToken();
    await getMusicData(localStorage.getItem('token'), search)
    .then((response) => setResultArray(response));
  };

  // function to add a song to the playlist
  const addSong = (event) => {
    event.preventDefault();
    const target = event.target.parentElement.id;
    const songToAdd = resultArray.filter((item) => item.id === target);
    setPlaylistArray([...playlistArray, songToAdd[0]]);
    setResultArray(resultArray.filter((item) => item.id !== target));
  };

  // TODO: function to post the playlist to Spotify
  const createPlaylist = async (event) => {
    event.preventDefault();
    await postPlaylist(localStorage.getItem('token'), playlistName)
    .then((data) => postSongs(localStorage.getItem('token'), data.id, playlistArray));
  };

  

  if (window.location.search.includes('code')) {
    setToken(authenticate());
  }



   return (
    <div className="App" >
      <Header handleLogin={handleLogin} token={token}/>
      <SearchBar 
      className="searchBar" 
      handleSearch={handleSearch} 
      value={search} 
      displayResult={searchTitles}
      />
      <div className="mainContent">
        <Results 
          resultArray={resultArray} 
          addSong={addSong} 
        />
        <Playlist 
          result={playlistArray} 
          playlistName={playlistName} 
          handlePlaylistName={handlePlaylistName} 
          createPlaylist={createPlaylist} 
        />
      </div>
    </div>
  );
};

export default App;

