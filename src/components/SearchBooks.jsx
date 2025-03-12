import { useState } from 'react';

const SearchBooks = ({ setBooks, setTitle }) => {
  const [query, setQuery] = useState();

  const handleSearch = () => {
    if (query.trim() !== '') {
      setBooks(query);
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={e =>
          setQuery(e.target.value) && setTitle(e.target.value)
        }
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
    </>
  );
};

export default SearchBooks;
