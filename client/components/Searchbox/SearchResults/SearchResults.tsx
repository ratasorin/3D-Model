import { useEffect, useState } from 'react';
import { debounceTime, from, mergeMap, tap, map } from 'rxjs';
import searchResults from './searchResults.module.css';
import { monuments } from 'components/Map/featureLayers/monuments';
import Card from './Card/Card';
import { searchQuery$ } from '../Searchbar/Searchbar';

export interface Church {
  name: string;
  lat: number;
  long: number;
}
const Searchbar = () => {
  const [inputValue, setInputValue] = useState<Church[]>([]);
  useEffect(() => {
    const data$ = from(monuments);
    monuments.then((monument) =>
      setInputValue(
        monument.sort((prev, curr) => (prev.name > curr.name ? 1 : -1))
      )
    );
    const obs = searchQuery$
      .pipe(
        mergeMap((inputValue: string) => {
          return data$.pipe(
            map((data) => data.filter((data) => data.name.includes(inputValue)))
          );
        }),
        debounceTime(500),
        tap((church) => {
          return church ? setInputValue(church) : 0;
        })
      )
      .subscribe();

    return () => {
      obs.unsubscribe();
    };
  }, []);
  return (
    <div className={searchResults.panel}>
      <div className={searchResults.cards__container}>
        {inputValue?.map((value) => {
          const { lat, long } = value;
          value.lat = Number(lat.toFixed(4));
          value.long = Number(long.toFixed(4));
          return <Card key={value.name} church={value}></Card>;
        })}
      </div>
    </div>
  );
};

export default Searchbar;
