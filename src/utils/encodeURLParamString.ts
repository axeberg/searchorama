export type Option = {
  key: string;
  value?: string | number | (string | number)[];
};

/**
 * Function that takes an object of key value params and
 * constructs a string.
 * @param options
 * @returns a `&key=value` based string for each pair in `options`
 */
export function encodeURLParamString(options: Option[]) {
  return options
    .map(({ key, value }, index) => {
      if (value === undefined) {
        return `&${encodeURIComponent(key)}`;
      }
      return `&${encodeURIComponent(key)}=${encodeURIComponent(
        Array.isArray(value) ? value.join(',') : value,
      )}`;
    })
    .join('');
}