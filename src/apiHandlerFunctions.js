// Information to reach API
const clientID = 'e3c027a6665e48f384c60c3846ec41de';
const clientSecret = '09cc923e2cda49c58055b7b49a2b2ca0';
const authEndPoint = 'https://accounts.spotify.com/api/token';
const searchEndPoint = 'https://api.spotify.com/v1/search';
const query = '?q=';
const limit = '&limit=10';
const market = '&market=US';
const searchType = '&type=track';
const myUserID = '31yyxt7n7pzvaibfajrdmawzbfeu';
const userAuthEndpoint = 'https://accounts.spotify.com/authorize?client_id=e3c027a6665e48f384c60c3846ec41de&response_type=code&redirect_uri=http://localhost:3000/&scope=playlist-modify-private';


// Get a token
const getToken = async () => {
    
    try {
        const result = await fetch(authEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
        });
        const data = await result.json();
        return data.access_token;

    } catch (error) {
        alert(error);
    }
};

// Get music data
const getMusicData = async (token, searchParam) => {
    const musicEndPoint = searchEndPoint + query + searchParam + searchType + market + limit;
    const result = await fetch(musicEndPoint, {
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

// TODO: Create function to redirect user to Spotify login page
const authRedirect = async () => {
    window.location.href = userAuthEndpoint;
}

// TODO: Create function to authenticate user with the Spotify API
const requestUserAuthorization = async () => {
        
    try {
        window.location.href = userAuthEndpoint;
        const args = new URLSearchParams(window.location.search);
        const code = args.get('code');
        return code;
    
    } catch (error) {
        alert(error);
    }};
    


// TODO: Create function to create a playlist with the selected songs
const postPlaylist = async (token, playlistName, playlistArray) => {
    const createPlaylistEndPoint = `https://api.spotify.com/v1/users/${myUserID}/playlists`;  
        
        try {
        const result = await fetch(createPlaylistEndPoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'A playlist created by the Spotify API',
                public: false
            })
        });
        const data = await result.json();
        return data;
        } catch (error) {
            alert(error); }
    /*
    const data = await result.json();
    const playlistID = data.id;
    const addSongEndPoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    playlistArray.forEach(async (item) => {
        await fetch(addSongEndPoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [`spotify:track:${item.id}`]
            })
        });
    }); */
};

export { getToken, getMusicData, postPlaylist, requestUserAuthorization };