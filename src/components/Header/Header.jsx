import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/" className={styles.link}>
                    All book
                </Link>
                <Link to="/bookList" className={styles.link}>
                    List of Books
                </Link>
                <Link to="/admin" className={styles.link}>
                    Admin
                </Link>
            </nav>
        </header>
    );
};

export default Header;
