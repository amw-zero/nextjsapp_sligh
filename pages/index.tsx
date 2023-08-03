import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClientState, store, Counter } from '../lib/state';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';

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
  const { counters, isLoading, Get, Create } = useBoundStore((state) => ({ 
    counters: state.counters, 
    isLoading: state.isLoading,
    Get: state.Get,
    Create: state.Create,
  }));

  useEffect(() => {
    Get();
  }, []);

  const [counterName, setCounterName] = useState("");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <input value={counterName} onChange={(e) => setCounterName(e.target.value)} />
        <button onClick={() => {
          Create(counterName);
          setCounterName("");
        }}>
          Add counter
        </button>
        {counters.map((counter) => (
          <CounterView key={counter.name} counter={counter} isLoading={isLoading} />
        ))}        
      </main>
    </div>
  )
}

export default Home
