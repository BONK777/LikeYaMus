import React, { useEffect, useRef, useState } from 'react';
import styles from './Player.module.css';

interface PlayerProps {
  src: string | null;
  title?: string;
  artist?: string;
  onEnded?: () => void;
}

const Player: React.FC<PlayerProps> = ({ src, title, artist, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // При смене src — загружаем новый трек и запускаем
  useEffect(() => {
    if (src && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Не удалось воспроизвести трек:', err);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
    }
  }, [src]);

  // Обновляем громкость
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Обновление прогресса воспроизведения
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Перемотка
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Переключение Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Ошибка при воспроизведении:', err);
          setIsPlaying(false);
        });
    }
  };

  // Управление громкостью
  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  // Формат времени mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        {title || 'No track selected'} — {artist || '-'}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.playPauseBtn}
          onClick={togglePlay}
          disabled={!src}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        <div className={styles.progressBar}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={onSeek}
            disabled={!src}
            className={styles.progressInput}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#aaa' }}>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.volumeControl}>
          <label htmlFor="volume" style={{ color: '#aaa' }}>Vol</label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onVolumeChange}
            disabled={!src}
            className={styles.volumeInput}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        preload="metadata"
      >
        {src && <source src={src} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
