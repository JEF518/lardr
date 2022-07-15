import Head from 'next/head';
import Image from 'next/image';
import {Component} from 'react';
import { Fragment } from 'react';
import Autocomplete from '../components/Autocomplete';
import styles from '../styles/Home.module.css';
const axios = require('axios');

export default class Inventory extends Component{
    constructor(props){
        super(props)
        this.state = {value: '', items : []};
        this.loadItems = this.loadItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
      this.loadItems();
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
          console.log(this.state.value);
        axios.post("http://localhost:3000/api/item/add", {"name": this.state.value, "amount": 0, "recipes": []});
        alert('An item was submitted: ' + this.state.value);
        event.preventDefault();
      }

      async loadItems() {
        const promise = await axios.get("http://localhost:3000/api/inventory");
        const status = promise.status;
        console.log(status);
        if (status === 200) {
          const data = Object.assign([], promise.data);
          const itemNames = data.map((item) => item.name);
          console.log(typeof data, data);
          //  console.log('data', data);
          this.setState({ items: itemNames });
        }
      }

  render() {
    
    return (
    <div className={styles.container}>
      <Head>
        <title>Add Recipe</title>
        <meta name="description" content="Inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <form onSubmit={this.handleSubmit}>
  <label>
    Recipe Name:
    <input type="text" name="recipe" value={this.state.value} onChange={this.handleChange}/>
  </label>
  <br/>
  <label>
    Ingredients:
    <Autocomplete suggestions={this.state.items}/>
  </label>
  <br/>
  <input type="submit" value="Submit" />
</form>
<h2>Add Ingredient:</h2>
<form onSubmit={this.handleSubmit}>
  <label>
    Item:
    <input type="text" name="item" value={this.state.value} onChange={this.handleChange}/>
  </label>
  <input type="submit" value="Submit" />
</form>
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
