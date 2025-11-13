import { useContext } from 'react';
import { type InitalContextState, SearchContext } from '../components/Search/SearchProvider';

const useSearch = (): InitalContextState => {
  const state = useContext(SearchContext);
  return state;
};

export default useSearch;
