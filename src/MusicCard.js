import React from "react";
import "./MusicCard.css";

const MusicCard = () => {

    return (
        <div className="musicCard">
            <img src="https://via.placeholder.com/100" alt="Album Cover" />
            <div className="musicInfo">
                <h2>Album Name</h2>
                <p>Artist Name</p>
            </div>
            <button>X</button>
        </div>
    );
};

export default MusicCard;