import React, { useState } from 'react';
import TrackItem from '../components/TrackItem';

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

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Поиск</h1>

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
            onPlay={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default Search;
