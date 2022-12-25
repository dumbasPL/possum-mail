export type EnumKeys<Enum> = Exclude<keyof Enum, number>

export const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
  const copy = {...e} as { [K in EnumKeys<Enum>]: Enum[K] };
  Object.values(e).forEach(value => typeof value === 'number' && delete copy[value]);
  return copy;
};

export const enumObjectReverse = <Enum extends Record<string, number | string>>(e: Enum) => {
  const obj = enumObject(e);
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) as { [K in keyof typeof obj as typeof obj[K]]: K };
};

export const enumKeys = <Enum extends Record<string, number | string>>(e: Enum) => {
  return Object.keys(enumObject(e)) as EnumKeys<Enum>[];
};

export const enumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
  return [...new Set(Object.values(enumObject(e)))] as Enum[EnumKeys<Enum>][];
};
