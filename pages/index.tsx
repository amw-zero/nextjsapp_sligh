import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClientState, store } from '../lib/state';
import { useStore } from 'zustand';

const Count = ({ count, isLoading }: { count: number, isLoading: boolean }) => {
  return <>
    <div>
      {isLoading ? "loading..." : "done"}
    </div>
    <div>
      {count}
    </div>
  </>
}

const Home: NextPage = () => {
  function useBoundStore<T>(selector: (state: ClientState) => T) {
    return useStore(store, selector)
  }

  const { count, increment, isLoading } = useBoundStore((state) => ({ 
    count: state.value, 
    increment: state.Increment,
    isLoading: state.isLoading,
  }));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        <Count count={count} isLoading={isLoading} />

        <button onClick={() => increment()}>
          Inc
        </button>
      </main>
    </div>
  )
}

export default Home
