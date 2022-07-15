import Head from 'next/head';
import Image from 'next/image';
import {Component} from 'react';
import { Fragment } from 'react';
import styles from '../styles/Home.module.css';
const axios = require('axios');

export default class Inventory extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
        this.loadItems = this.loadItems.bind(this);
    }
    componentWillMount() {
        this.loadItems();
      }
    
      async loadItems() {
        const promise = await axios.get("http://localhost:3000/api/allrecipes");
        const status = promise.status;
        console.log(status);
        if (status === 200) {
          const data = Object.assign([], promise.data);
          console.log(typeof data, data);

          const newData = await Promise.all(data.map(async (item) => {
          const promise = await axios.get(`http://localhost:3000/api/recipe/${item}`);
          if (promise.status === 200){
              return promise.data;
          }
            }));
          console.log('newData', newData);
          this.setState({ items: newData });
          console.log('this.state.items', this.state.items);
        }
      }
  render() {
    
    return (
    <div className={styles.container}>
      <Head>
        <title>Inventory</title>
        <meta name="description" content="Inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <table>
  <tr>
    <th>Recipe</th>
    <th>Ingredients</th>
  </tr>
  {console.log('intemplate', this.state.items)}
      {this.state.items.map(function (item) {
        console.log('el item', item);
        return     <Fragment>
        <tr><td>{item.name}</td>
        <td>{item.ingredients.map(function (ingredient) {
          return <span className={ingredient.inStock}> {ingredient.item}, </span>})
        } </td>
  </tr> 
        </Fragment>

      }, this)}
      </table>
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
}
