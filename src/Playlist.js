import React from 'react';
import MusicCard from './MusicCard';
import './Results.css';

const Playlist = (props) => {
    return (
        <div className="playList">
            <form className="playlistForm">
                <input type="text" placeholder="Playlist Name" onChange={props.handlePlaylistName} value={props.playlistName} />
                <button type="submit" value="Create" onClick={props.createPlaylist}>Create</button>
            </form>
            {props.result.map((item) => (<MusicCard  
            key={item.id}
            id={item.id}
            songTitle={item.name} 
            artist={item.artist} 
            cover={item.cover} 
            />))}

        </div>
    );
};

export default Playlist;