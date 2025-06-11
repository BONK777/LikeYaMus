import { useParams } from 'react-router-dom';
import Player from '../components/Player';
import { tracks } from '../api/tracks'; // импорт общего массива

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
      <img
        src={track.cover}
        alt={`${track.title} cover`}
        style={{ width: '300px', marginBottom: '1rem' }}
      />
      <Player
        src={track.src}
        title={track.title}
        artist={track.artist}
        onEnded={() => {}}
      />
    </div>
  );
};

export default TrackPage;
