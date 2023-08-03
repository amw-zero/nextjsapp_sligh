import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClientState, store, Counter } from '../lib/state';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';

function useBoundStore<T>(selector: (state: ClientState) => T) {
  return useStore(store, selector)
}

const CounterView = ({ counter }: { counter: Counter }) => {
  const { increment, AddFavorite } = useBoundStore((state) => ({
    increment: state.Increment,
    AddFavorite: state.AddFavorite,
  }));

  return <>   
    <div>
      {`${counter.name}: ${counter.value}`}
    </div>
    <button onClick={() => increment(counter.name)}>
      Inc
    </button>
    <button onClick={() => AddFavorite(counter.name)}>
      Add Favorite
    </button>
  </>
}

const Home: NextPage = () => {
  const { counters, isLoading, GetCounters, Create, GetFavorites, favorites } = useBoundStore((state) => ({ 
    counters: state.counters, 
    isLoading: state.isLoading,
    GetCounters: state.GetCounters,
    Create: state.Create,
    GetFavorites: state.GetFavorites,
    favorites: state.favorites,
  }));

  useEffect(() => {
    GetCounters();
    GetFavorites();
  }, []);

  const [counterName, setCounterName] = useState("");

  const favoriteCounters = counters.filter((c) => favorites.includes(c.name));
  const regularCounters = counters.filter((c) => !favorites.includes(c.name));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {isLoading ? "loading..." : "done"}
        </div>
        <h1>
          These are the favorites
        </h1>
        {favoriteCounters.map((counter) => (
          <CounterView key={counter.name} counter={counter} isLoading={isLoading} />
        ))}        
        <h1>
          Regular counters
        </h1>
        {regularCounters.map((counter) => (
          <CounterView key={counter.name} counter={counter} isLoading={isLoading} />
        ))}  
        <h1>
          Add more
        </h1>
        <input value={counterName} onChange={(e) => setCounterName(e.target.value)} />
        <button onClick={() => {
          Create(counterName);
          setCounterName("");
        }}>
          Add counter
        </button>
      </main>
    </div>
  )
}

export default Home
