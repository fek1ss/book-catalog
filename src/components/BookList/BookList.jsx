import Book from './../BookCard/Book';
import styles from './styles.module.css';

const BookList = ({ books, handleDelete }) => {
    return (
        <div className={styles.bookList}>
            <div className={styles.innerList}>
                {books.map(book => (
                    <Book
                        key={book.id}
                        handleDelete={handleDelete}
                        id={book.id}
                        title={book.title}
                        description={book.description}
                        author={book.author}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookList;
