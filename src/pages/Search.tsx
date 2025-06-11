import React, { useState } from 'react';
import TrackItem from '../components/TrackItem';
import { tracks } from '../api/tracks'; // общий массив треков

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
            cover={track.cover}
            onPlay={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default Search;
