import {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { encodeString } from 'use-query-params';
import { Input } from 'theme-ui';

import useDebounce from '../../hooks/useDebounce';
import usePrevious from '../../hooks/usePrevious';
import useSearch from '../../hooks/useSearch';

export default function Search(props: ComponentProps<typeof Input>) {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState<string>(query);

  const valueDebounced = useDebounce(value, 800);
  const previousValueDebounced = usePrevious(valueDebounced);

  useEffect(() => {
    if (
      previousValueDebounced !== valueDebounced &&
      valueDebounced.length > 0
    ) {
      if (location.pathname !== '/search') {
        navigate({
          pathname: '/search',
          search: `?query=${encodeString(valueDebounced)}`,
        });
      } else if (query !== valueDebounced) {
        setQuery(valueDebounced);
      }
    }
  }, [
    query,
    setQuery,
    valueDebounced,
    previousValueDebounced,
    navigate,
    location,
  ]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <Input
      placeholder="What's the name of the movie? ..."
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
