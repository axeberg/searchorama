import { ChangeEvent, ComponentProps, useCallback, useState } from 'react';
import { Input } from 'theme-ui';

export default function Search(props: ComponentProps<typeof Input>) {
  const [value, setValue] = useState<string>();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  <Input
    placeholder="Search ..."
    value={value}
    onChange={handleChange}
    {...props}
  />;
}
