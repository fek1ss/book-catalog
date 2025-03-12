import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const fetchBook = async bookId => {
    setId(bookId);
    try {
      const response = await fetch(
        `http://localhost:3001/books/${bookId}`,
      );
      if (response.ok) {
        const book = await response.json();
        setTitle(book.title);
        setDescription(book.description);
      } else {
        alert('Book not found');
      }
    } catch (error) {
      console.log('Error fetching book: ', error);
    }
  };

  const handleUpdateBook = async bookId => {
    const existingTitle = books.find(book => book.title === title);
    const existingDesc = books.find(
      book => book.description === description,
    );
    try {
      const response =
        !existingTitle || !existingDesc
          ? await fetch(`http://localhost:3001/books/${bookId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                description,
              }),
            })
          : alert('Update at least one parametrs');

      if (response.ok) {
        alert('Update Succesfull');
      } else {
        alert('Failed to update book');
      }
    } catch (error) {
      console.log('Error updating book', error);
    }
  };

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <p>Выберите книгу для обновления</p>
        {books.map(book => (
          <li
            className={styles.book}
            onClick={() => fetchBook(book.id)}
          >
            {book.title}
          </li>
        ))}
      </div>

      <div className={styles.container_inps}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={styles.inp}
          placeholder="update title"
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styles.inp}
          placeholder="update description"
        />
        <button
          className={styles.btnUpdate}
          onClick={() => handleUpdateBook(id)}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Admin;
