import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';
import Tmdb from './services/tmdb.service';

const tmdb = new Tmdb(process.env.REACT_APP_TMDB_ACCESS_KEY || 'access-token-needed');

function App() {
  const [title, setTitle] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitle(search);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    tmdb.movies({ query: title });
  }, [title]);

  return (
    <div className="App">
      <header className="App-header">Searchorama</header>

      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor="search">Search for a movie</label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="What movie are you looking for?"
            onChange={handleChange}
          />
          <button type="submit">Find it</button>
        </form>
      </div>
    </div>
  );
}

export default App;
