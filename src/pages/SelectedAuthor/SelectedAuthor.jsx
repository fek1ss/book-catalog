import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const ListBooks = () => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/authors')
            .then(response => response.json())
            .then(data => setAuthors(data));
    }, []);

    useEffect(() => {
        if (selectedAuthor) {
            fetch(
                `http://localhost:3001/books?authorId=${selectedAuthor.id}`,
            )
                .then(response => response.json())
                .then(data => setBooks(data));
        }
    }, [selectedAuthor]);

    return (
        <div className={styles.selectedBooks}>
            <div className={styles.bookList}>
                <h1 className={styles.title}>Authors</h1>
                <ul>
                    {authors.map(author => (
                        <li
                            onClick={() => setSelectedAuthor(author)}
                            className={styles.author}
                            key={author.id}
                        >
                            {author.name}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedAuthor && (
                <div className={styles.selectedList}>
                    <h2 className={styles.title}>
                        Books by {selectedAuthor.name}
                    </h2>
                    <ul>
                        {books.map(book => (
                            <li
                                key={book.id}
                                className={styles.selected}
                            >
                                <h2 className={styles.title}>
                                    {book.title}
                                </h2>
                                <p className={styles.description}>
                                    {book.description}
                                </p>
                                <p className={styles.authorBook}>
                                    {book.author}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ListBooks;
