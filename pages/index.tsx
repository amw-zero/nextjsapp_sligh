import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { store } from '../lib/state';
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
  const useBoundStore = (selector) => useStore(store, selector)

  const { count, increment, isLoading } = useBoundStore((state) => ({ 
    count: state.count, 
    increment: state.increment,
    isLoading: state.isLoading,
  }));

  const { count2, increment2, isLoading2 } = useBoundStore((state) => ({ 
    count2: state.count2, 
    increment2: state.increment2,
    isLoading2: state.isLoading2,
  }));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        <Count count={count} isLoading={isLoading} />
        <Count count={count2} isLoading={isLoading2} />

        <button onClick={() => increment()}>
          Inc
        </button>

        <button onClick={() => increment2()}>
          Inc2
        </button>
      </main>
    </div>
  )
}

export default Home
