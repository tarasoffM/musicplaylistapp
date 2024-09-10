// Information to reach API
const clientID = 'e3c027a6665e48f384c60c3846ec41de';
const clientSecret = '09cc923e2cda49c58055b7b49a2b2ca0';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const searchEndPoint = 'https://api.spotify.com/v1/search';
const query = '?q=';
const limit = '&limit=10';
const market = '&market=US';
const searchType = '&type=track';
const myUserID = '31yyxt7n7pzvaibfajrdmawzbfeu';
const authorizeEndpoint = 'https://accounts.spotify.com/authorize?client_id=e3c027a6665e48f384c60c3846ec41de&response_type=code&redirect_uri=http://localhost:3000/&scope=playlist-modify-private';
const redirectURI = 'http://localhost:3000/';

// Request Access Token
const getToken = async (code) => {
    
    try {
        const result = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}`
        
        })
        .then((response) => response.json());
        
        return await result.access_token;

    } catch (error) {
        alert(error);
    }
};

// Get music data
const getMusicData = async (token, searchParam) => {
    const url = searchEndPoint + query + searchParam + searchType + market + limit;
    const result = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await result.json();
    return data.tracks.items.map((item) => {
        return {
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            id: item.id,
            cover: item.album.images[0].url
        };
    });
};

// TODO: Create function to redirect to Spotify login
const redirect = () => {
        
    try {
        let url = authorizeEndpoint;
        url += '&client_id=' + clientID;
        url += '&response_type=code';
        url += '&redirect_uri=' + encodeURIComponent(redirectURI);
        url += '&show_dialog=true';
        url += '&scope=playlist-modify-private playlist-modify-public';

        window.location.href = url;
    
    } catch (error) {
        alert(error);
    }};
    


// TODO: Create function to create a playlist with the selected songs
const postPlaylist = async (token, playlistName) => {
    const url = `https://api.spotify.com/v1/users/${myUserID}/playlists`;  
        try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'New playlist'
                
            })
        });
        const data = await result.json();
        return data;
        } catch (error) {
            alert(error); }
        };
    
const postSongs = async (token, playlistID, playlistArray) => {

    const addSongEndPoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    let trackList = playlistArray.map(item => `spotify:track:${item.id}`);
    await fetch(addSongEndPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: trackList,
            position: 0
        })
    }); 
};


export { getToken, getMusicData, postPlaylist, redirect, postSongs };