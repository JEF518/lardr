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
        const promise = await axios.get("http://localhost:3000/api/inventory");
        const status = promise.status;
        console.log(status);
        if (status === 200) {
          const data = Object.assign([], promise.data);
          console.log(typeof data, data);
          //  console.log('data', data);
          this.setState({ items: data });
        }
      }

     incrementItem(itemToIncrement, increase){
      let name = itemToIncrement.name;
        let items = Object.assign([], this.state.items);

        let newItems = items.map((item) => {
            if (item.name === name) {
              if (increase === true) {
                item.amount = item.amount + 1;
              }
              else if (increase === false) {
                if (item.amount >= 1) {
                  item.amount = item.amount - 1;
                }
              }
              return item;
            }
            return item;
        })
        let itemsObject = Object.assign({}, newItems);
        axios.post("http://localhost:3000/api/item/addall", itemsObject);
        this.setState({items : Object.assign([], itemsObject)});
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
    <th>Item</th>
    <th>Amount</th>
  </tr>
  {console.log('intemplate', this.state.items)}

      {this.state.items.map(function (item) {
        return     <Fragment>
        <tr><td>{item.name}</td>
        <td>{item.amount}</td>
        <td><button onClick={() => this.incrementItem(item, true)}>+</button></td>
        <td><button onClick={() => this.incrementItem(item, false)}>-</button></td>
  </tr> 
        </Fragment>

      }, this)}
      </table>
      <a href="/add">[ Add ]</a>
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
