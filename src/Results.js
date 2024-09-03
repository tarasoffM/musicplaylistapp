import React from 'react';
import MusicCard from './MusicCard';
import './Results.css';

// Populates the music cards with the search results and renders to the result div
const Results = (props) => {

    return (
        <div className="results">
            {props.result.map((item) => (<MusicCard  songTitle={item.name} artist={item.artist} cover={item.cover} displayResult={props.displayResult} />))}

        </div>
    );
};

export default Results;