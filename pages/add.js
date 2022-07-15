import Head from 'next/head';
import Image from 'next/image';
import Autocomplete from '../components/Autocomplete';
import {Component} from 'react';
import { Fragment } from 'react';
import styles from '../styles/Home.module.css';
const axios = require('axios');

export default class Inventory extends Component{
    constructor(props){
        super(props)
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
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
  render() {
    
    return (
    <div className={styles.container}>
      <Head>
        <title>Add Ingredients</title>
        <meta name="description" content="Inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
