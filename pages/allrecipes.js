import Head from 'next/head';
import Image from 'next/image';
import {Component} from 'react';
import { Fragment } from 'react';
import styles from '../styles/Home.module.css';
const axios = require('axios');

export default class Recipes extends Component{
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
    axios.get("http://localhost:3000/api/allrecipes").then((res) => 
    this.setState({items : res.data})
    )
  //   const promise = await axios.get("http://localhost:3000/api/allrecipes");
  //   const status = promise.status;
  //   console.log(status);
  //   if (status === 200) {
  //   //  console.log(data)
  //   // console.log('promise.data....', promise.data);
  //  // console.log(typeof promise.data);
  //     const data = Object.assign([], promise.data);
  //     console.log('data', typeof data, data);
  //     this.setState({ items: data});
  //   //  this.state ={ items: data };
  //   }
  };

  render() {
    
  return (
  <div className={styles.container}>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <table>
  <tr>
    <th>Recipe</th>
    <th>Ingredients</th>
    <th>All Ingredients In?</th>
  </tr>
  {console.log('this.state.items', this.state.items)};
      {this.state.items.map(function (item) {
        return     <Fragment>
        <tr><td>{item}</td>
       {axios.get(`http://localhost:3000/api/recipe/${item}`).then(function(data){
      //   console.log(item, 'recipe: ', data.data.ingredients);
    //  <td>{data.data.ingredients.map((ingredient)=> ingredient)}</td>
       })}
       </tr>
        {/* <td>{item.amount}</td></tr>  */}
        </Fragment>

      })}
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
