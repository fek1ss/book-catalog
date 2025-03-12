import styles from './styles.module.css';

const Book = ({ title, description, author, handleDelete, id }) => {
    return (
        <div className={styles.bookCard}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <p className={styles.author}>{author}</p>
            <button
                className={styles.delete}
                onClick={() => handleDelete(id)}
            >
                delete
            </button>
        </div>
    );
};

export default Book;
