import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lardr</title>
        <meta name="description" content="Lardr app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Lardr
        </h1>

        <p className={styles.description}>
          What have we got in?
        </p>

        <div className={styles.grid}>
          <a href="/inventory" className={styles.card}>
            <h2>Inventory &rarr;</h2>
            <p>An inventory of all food items in the house.</p>
          </a>

          <a href="/add" className={styles.card}>
            <h2>Add To Inventory &rarr;</h2>
            <p>Add a new item to the inventory!</p>
          </a>

          <a
            href="/remove-item"
            className={styles.card}
          >
            <h2>Remove From Inventory &rarr;</h2>
            <p>Remove Item From Inventory.</p>
          </a>

          <a
            href="/recipes"
            className={styles.card}
          >
            <h2>Recipes &rarr;</h2>
            <p>
              Explore recipes available.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
