import React from 'react';
import MusicCard from './MusicCard';
import './Results.css';

// Populates the music cards with the search results and renders to the result div
const Results = (props) => {

    return (
        <div className="results">
            {props.resultArray.map((item) => (<MusicCard  
            key={item.id}
            id={item.id}
            songTitle={item.name} 
            artist={item.artist} 
            cover={item.cover} 
            addSong={props.addSong}
            />))}
        </div>
    );
};

export default Results;