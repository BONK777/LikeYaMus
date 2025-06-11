import React, { useState } from 'react';
import TrackItem from '../components/TrackItem';
import PlayerModal from '../components/PlayerModal';
import { tracks } from '../api/tracks';

const Home: React.FC = () => {
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlay = (id: string) => {
    const index = tracks.findIndex(t => t.id === id);
    setPlayingTrackIndex(index);
  };

  const handleEnded = () => {
    if (playingTrackIndex === null) return;

    const nextIndex = playingTrackIndex + 1;
    if (nextIndex < tracks.length) {
      setPlayingTrackIndex(nextIndex);
    } else {
      setPlayingTrackIndex(null);
    }
  };

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playingTrack = playingTrackIndex !== null ? tracks[playingTrackIndex] : null;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Главная страница</h1>

      <input
        type="text"
        placeholder="Поиск треков или артистов..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      {filteredTracks.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        filteredTracks.map(track => (
          <TrackItem
            key={track.id}
            id={track.id}
            title={track.title}
            artist={track.artist}
            cover={track.cover}
            onPlay={handlePlay}
          />
        ))
      )}

      <PlayerModal
        isOpen={playingTrack !== null}
        src={playingTrack?.src || null}
        cover={playingTrack?.cover}
        title={playingTrack?.title}
        artist={playingTrack?.artist}
        onClose={() => setPlayingTrackIndex(null)}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Home;
