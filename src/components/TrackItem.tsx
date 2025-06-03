import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrackItem.module.css';

interface Props {
  id: string;
  title: string;
  artist: string;
  onPlay?: (id: string) => void;
}

const TrackItem: React.FC<Props> = ({ id, title, artist, onPlay }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tracks/${id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) onPlay(id);
  };

  return (
    <div className={styles.trackItem} onClick={handleClick} role="button" tabIndex={0} onKeyDown={e => { if(e.key === 'Enter') handleClick(); }}>
      <div className={styles.trackInfo}>
        <h3 className={styles.trackTitle} title={title}>{title}</h3>
        <p className={styles.trackArtist} title={artist}>{artist}</p>
      </div>
      {onPlay && (
        <button
          className={styles.playButton}
          onClick={handlePlayClick}
          aria-label={`Play ${title}`}
          title={`Play ${title}`}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default TrackItem;
