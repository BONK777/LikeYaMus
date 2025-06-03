import React, { useState } from 'react';
import TrackItem from '../components/TrackItem';
import PlayerModal from '../components/PlayerModal'; // заменили Player


interface Track {
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
}

const tracks: Track[] = [
  {
    id: '1',
    title: 'Song One',
    artist: 'Artist A',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Song Two',
    artist: 'Artist B',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Song Three',
    artist: 'Artist C',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

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
        placeholder="Search tracks or artists..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      {filteredTracks.length === 0 ? (
        <p>No tracks found</p>
      ) : (
        filteredTracks.map(track => (
          <TrackItem
            key={track.id}
            id={track.id}
            title={track.title}
            artist={track.artist}
            onPlay={handlePlay}
          />
        ))
      )}

      <PlayerModal
        isOpen={playingTrack !== null}
        src={playingTrack?.audioSrc || null}
        title={playingTrack?.title}
        artist={playingTrack?.artist}
        onClose={() => setPlayingTrackIndex(null)}
        onEnded={handleEnded}
    />
    </div>
  );
};

export default Home;
