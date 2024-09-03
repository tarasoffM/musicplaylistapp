import React from "react";
import "./MusicCard.css";

const MusicCard = (props) => {

    return (
        <div className="musicCard">
            <img src={props.cover} alt="Album Cover" />
            <div className="musicInfo">
                <h2 id="cardTitle" className="cardTitle" >{props.songTitle}</h2>
                <p>{props.artist}</p>
            </div>
            <button onClick={() => props.displayResult().then((result) => alert(result))}>Add</button>
        </div>
    );
};

export default MusicCard;