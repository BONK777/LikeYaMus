import React from 'react';
import styles from './PlayerModal.module.css';
import Player from './Player';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  cover?: string;
  title?: string;
  artist?: string;
  onEnded: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  onClose,
  src,
  cover,
  title,
  artist,
  onEnded,
}) => {
  if (!isOpen || !src) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close player modal"
        >
          <span className={styles.closeIcon} />
        </button>
        {cover && <img src={cover} alt={`${title} cover`} className={styles.cover} />}
        <h2>{title}</h2>
        <h4>{artist}</h4>
        <Player src={src} title={title} artist={artist} onEnded={onEnded} />
      </div>
    </div>
  );
};

export default PlayerModal;
