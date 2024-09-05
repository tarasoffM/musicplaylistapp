import React from "react";
import "./MusicCard.css";

const MusicCard = (props) => {

    return (
        <div id={props.id} className="musicCard">
            <img src={props.cover} alt="Album Cover" />
            <div className="musicInfo">
                <h2>{props.songTitle}</h2>
                <p>{props.artist}</p>
            </div>
            <button onClick={props.addSong}>Add</button>
        </div>
    );
};

export default MusicCard;