// Information to reach API
const clientID = 'e3c027a6665e48f384c60c3846ec41de';
const clientSecret = '09cc923e2cda49c58055b7b49a2b2ca0';
const authEndPoint = 'https://accounts.spotify.com/api/token';
const searchEndPoint = 'https://api.spotify.com/v1/search';
const query = '?q=';
const limit = '&limit=10';
const market = '&market=US';
const searchType = '&type=track';


// Get a token
const getToken = async () => {
    const result = await fetch(authEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
    });
    const data = await result.json();
    return data.access_token;
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

export { getToken, getMusicData };