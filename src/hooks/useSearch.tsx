import { useContext } from 'react';
import { SearchContext, InitalContextState } from '../components/Search/SearchProvider';

const useSearch = (): InitalContextState => {
  const state = useContext(SearchContext);
  return state;
};

export default useSearch;
