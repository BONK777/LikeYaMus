import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>Загрузка...</p>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h2>Профиль</h2>

      <div className={styles.info}>
        <b>Имя:</b> <span>{user.name}</span>
      </div>
      <div className={styles.info}>
        <b>Email:</b> <span>{user.email}</span>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => navigate('/home')}>В плеер</button>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default Profile;
