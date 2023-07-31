import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClientState, store, Counter } from '../lib/state';
import { useStore } from 'zustand';
import { useEffect } from 'react';

const CounterView = ({ counter, isLoading }: { counter: Counter, isLoading: boolean }) => {
  return <>
    <div>
      {isLoading ? "loading..." : "done"}
    </div>
    <div>
      {`${counter.name}: ${counter.value}`}
    </div>
  </>
}

const Home: NextPage = () => {
  function useBoundStore<T>(selector: (state: ClientState) => T) {
    return useStore(store, selector)
  }

  const { counters, increment, isLoading, Get } = useBoundStore((state) => ({ 
    counters: state.counters, 
    increment: state.Increment,
    isLoading: state.isLoading,
    Get: state.Get,
  }));

  useEffect(() => {
    Get();
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {counters.map((counter) => (
          <CounterView counter={counter} isLoading={isLoading} />
        ))}
        <button onClick={() => increment()}>
          Inc
        </button>
      </main>
    </div>
  )
}

export default Home
