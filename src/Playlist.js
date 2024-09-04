import React from 'react';
import MusicCard from './MusicCard';
import './Results.css';

const Playlist = (props) => {
    return (
        <div className="playList">
            {props.result.map((item) => (<MusicCard  songTitle={item.name} artist={item.artist} cover={item.cover} />))}

        </div>
    );
};

export default Playlist;