import React from "react";

const SearchBar = (props) => {
    return (
        <div>
        <form className="searchBar">
            <input type="text" placeholder="Search for music" onChange={props.handleSearch} value={props.value} />
            <button type="submit" value="Search" onClick={props.displayResult}>Search</button>
        </form>
        </div>
    );
};

export default SearchBar;