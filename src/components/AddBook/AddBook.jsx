import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const AddBook = ({ updateList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then(response => response.json())
      .then(data => setAuthors(data));
  }, [authors]);

  const handleAddBook = async () => {
    const selectedAuthor = authors.find(
      author => author.name === author,
    );
    const newBook = {
      title,
      description,
      author,
      authorId: selectedAuthor && selectedAuthor.id,
    };

    try {
      const response =
        newBook.title && newBook.description && newBook.author
          ? await fetch('http://localhost:3001/books', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newBook),
            })
          : alert('не все поля книги заполнены');

      if (response.ok) {
        const saveBook = await response.json();
        updateList(saveBook);
        setTitle('');
        setDescription('');
        setAuthor('');
      } else alert('Failed to add book!');
    } catch (error) {
      console.log('Error adding book: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Book</h2>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <div className={styles.btn_select}>
        <button className={styles.addBtn} onClick={handleAddBook}>
          Add New Book
        </button>
        <select
          onChange={e => setAuthor(e.target.value)}
          className={styles.addBtn}
        >
          <option value="">Select an author</option>
          {authors.map(author => (
            <option
              key={author.id}
              value={author.name}
              className={styles.opt_author}
            >
              {author.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddBook;
