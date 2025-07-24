const axios = require('axios');
const fs = require('fs');

// Tu API Key
const API_KEY = 'AIzaSyDDJUAwCV7sfoIBMeHgvlhYCS1dkzwlFVs';
// ID del canal de Coach Cesar Lugo
const CHANNEL_ID = 'UCyr6ZTmztFW3FB4qG_97FoA';

async function getUploadsPlaylistId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function getAllVideos(playlistId) {
  let videos = [];
  let nextPageToken = '';
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    const res = await axios.get(url);
    videos = videos.concat(res.data.items.map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description
    })));
    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);
  return videos;
}

(async () => {
  try {
    const playlistId = await getUploadsPlaylistId();
    const videos = await getAllVideos(playlistId);

    // Si quieres solo los shorts, descomenta la siguiente línea:
    // const shorts = videos.filter(v => v.title.toLowerCase().includes('shorts') || v.description.toLowerCase().includes('shorts'));

    // Guardar todos los videos:
    fs.writeFileSync('cesar_lugo_videos.json', JSON.stringify(videos, null, 2));
    console.log(`¡Listo! Se guardaron ${videos.length} videos en cesar_lugo_videos.json`);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
})();