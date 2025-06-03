import { useParams } from 'react-router-dom';
import Player from '../components/Player';

const tracks = [
  {
    id: '1',
    title: 'Song One',
    artist: 'Artist A',
    cover: 'https://via.placeholder.com/300x300.png?text=Cover+1',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Song Two',
    artist: 'Artist B',
    cover: 'https://via.placeholder.com/300x300.png?text=Cover+2',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Song Three',
    artist: 'Artist C',
    cover: 'https://via.placeholder.com/300x300.png?text=Cover+3',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const TrackPage = () => {
  const { id } = useParams();
  const track = tracks.find(t => t.id === id);

  if (!track) {
    return <p style={{ padding: '1rem' }}>Трек не найден</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{track.title}</h1>
      <h2>{track.artist}</h2>
      <img src={track.cover} alt="Cover" style={{ width: '300px', marginBottom: '1rem' }} />
      <Player src={track.audioSrc} title={track.title} artist={track.artist} onEnded={() => {}} />
    </div>
  );
};

export default TrackPage;
