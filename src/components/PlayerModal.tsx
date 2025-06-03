import React from 'react';
import styles from './PlayerModal.module.css';
import Player from './Player';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  title?: string;
  artist?: string;
  onEnded: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  onClose,
  src,
  title,
  artist,
  onEnded,
}) => {
  if (!isOpen || !src) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{title}</h2>
        <h4>{artist}</h4>
        <Player src={src} title={title} artist={artist} onEnded={onEnded} />
      </div>
    </div>
  );
};

export default PlayerModal;
