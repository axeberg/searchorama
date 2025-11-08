import React from 'react';
import Search from '../Search/Search';

const Nav = () => {
  return (
    <nav className="w-full">
      <div className="container mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Searchorama
          </a>
          <div className="flex-1">
            <Search />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
