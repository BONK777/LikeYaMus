import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/home" className={styles.logo} style={{ cursor: 'pointer' }}>
        LikeYaMus
      </Link>
      <nav className={styles.navLinks}>
        <Link to="/home" className={styles.navLink}>Главная</Link>
        <Link to="/radio" className={styles.navLink}>Радио</Link>
        <Link to="/profile" className={styles.navLink}>Профиль</Link>
      </nav>
    </header>
  );
};

export default Header;
