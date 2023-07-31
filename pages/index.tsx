import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClientState, store, Counter } from '../lib/state';
import { useStore } from 'zustand';
import { useEffect } from 'react';

function useBoundStore<T>(selector: (state: ClientState) => T) {
  return useStore(store, selector)
}

const CounterView = ({ counter, isLoading }: { counter: Counter, isLoading: boolean }) => {
  const { increment } = useBoundStore((state) => ({
    increment: state.Increment,
  }));

  return <>
    <div>
      {isLoading ? "loading..." : "done"}
    </div>
    <div>
      {`${counter.name}: ${counter.value}`}
    </div>
    <button onClick={() => increment(counter.name)}>
      Inc
    </button>
  </>
}

const Home: NextPage = () => {
  const { counters, isLoading, Get } = useBoundStore((state) => ({ 
    counters: state.counters, 
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
      </main>
    </div>
  )
}

export default Home
