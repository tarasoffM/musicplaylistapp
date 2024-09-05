import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Results from './Results';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import { getToken, getMusicData, postPlaylist , requestUserAuthorization } from './apiHandlerFunctions';

function App() {

  const [search, setSearch] = useState('');
  const [resultArray, setResultArray] = useState([]);
  const [playlistArray, setPlaylistArray] = useState([]);
  const [playlistName, setPlaylistName] = useState('');


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
    const token = await getToken();
    await getMusicData(token, search)
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
    await requestUserAuthorization()
    .then(code => getToken(code))
    .then(token => postPlaylist(token, playlistName, playlistArray));
    
  

      

  

  };

    return (
    <div className="App">
      <Header />
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
}

export default App;
