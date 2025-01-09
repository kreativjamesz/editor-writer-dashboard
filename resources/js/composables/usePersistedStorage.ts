import { useStorage, type MaybeRef, type UseStorageOptions } from '@vueuse/core';

export function usePersistedStorage<T>(key: string, defaultValue: T, options?: UseStorageOptions<T>) {
  return useStorage<T>(key, defaultValue, localStorage, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : defaultValue),
      write: (v: any) => JSON.stringify(v),
    },
    ...options,
  });
}
