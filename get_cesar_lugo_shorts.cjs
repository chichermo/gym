const axios = require('axios');
const fs = require('fs');

// Tu API Key
const API_KEY = 'AIzaSyDDJUAwCV7sfoIBMeHgvlhYCS1dkzwlFVs';
// ID del canal de Coach Cesar Lugo
const CHANNEL_ID = 'UCw4QKQp6r6Zr2Zr5r6QKQp6w';

async function getUploadsPlaylistId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const res = await axios.get(url);
  if (!res.data.items || res.data.items.length === 0) {
    console.error('No se encontró el canal. Respuesta:', res.data);
    throw new Error('No se encontró el canal. Verifica el ID.');
  }
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

async function getDurations(videoIds) {
  const durations = {};
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(',')}&key=${API_KEY}`;
    const res = await axios.get(url);
    res.data.items.forEach(item => {
      // Parse ISO 8601 duration to seconds
      const match = item.contentDetails.duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
      let seconds = 0;
      if (match) {
        const minutes = parseInt(match[1] || '0', 10);
        const secs = parseInt(match[2] || '0', 10);
        seconds = (minutes * 60) + secs;
      }
      durations[item.id] = seconds;
    });
  }
  return durations;
}

(async () => {
  try {
    const playlistId = await getUploadsPlaylistId();
    const videos = await getAllVideos(playlistId);
    const videoIds = videos.map(v => v.id);
    const durations = await getDurations(videoIds);

    // Agregar duración a cada video
    const videosWithDuration = videos.map(v => ({
      ...v,
      duration: durations[v.id] || 0
    }));

    // Filtrar shorts (menos de 60 segundos)
    const shorts = videosWithDuration.filter(v => v.duration > 0 && v.duration <= 60);

    // Guardar en archivo JSON
    fs.writeFileSync('cesar_lugo_shorts.json', JSON.stringify(shorts, null, 2));
    console.log(`¡Listo! Se guardaron ${shorts.length} shorts en cesar_lugo_shorts.json`);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
})(); 