import { DependencyList } from 'react';
import { useState, useEffect } from 'react';

type LoadedData<T> = [T | null, boolean, (next: T) => void];

const NO_DEPS: DependencyList = [];

export function useLoading<T>(dataLoader: () => Promise<T>, dependnecy?: any): LoadedData<T> {
  const [data, setData] = useState(null as T | null);
  const [isLoadnig, setIsLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    const loader = dataLoader();
    loader
      .then((resp) => {
        if (!canceled) {
          setData(resp);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!canceled) {
          throw err;
        }
      });
    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependnecy]);

  return [data, isLoadnig, setData];
}
