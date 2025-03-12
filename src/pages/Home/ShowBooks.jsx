import { useEffect, useState } from 'react';
import BookList from '../../components/BookList/BookList';
import AddBook from '../../components/AddBook/AddBook';

const ShowBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Другой способ
    //     fetch('http://localhost:3001/books')
    //         .then(response => response.json())
    //         .then(data => setBooks(data));
    fetchBooks();
  }, []);

  const updateList = newBook => {
    setBooks(prev => [...prev, newBook]);
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(
        `http://localhost:3001/books/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) setBooks(books.filter(book => book.id !== id));
      else {
        console.log(response);
        alert('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <>
      <AddBook updateList={updateList} />
      <BookList books={books} handleDelete={handleDelete} />
    </>
  );
};

export default ShowBooks;
