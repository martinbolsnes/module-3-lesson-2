import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalize, orderBy } from 'lodash';
import moment from 'moment';
import { format } from 'date-fns';
import { DateTime } from 'luxon';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

function App() {
  const [list, setList] = useState([]);
  const [order, setOrder] = useState(false);
  const handleOnClick = () => {
    const newOrder = order ? 'asc' : 'desc';
    setList(orderBy(list, ['title'], [newOrder]));
    setOrder(!order);
  };
  /* useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/'
      );
      const JSON = await response.json();
      console.log(JSON);
    };

    fetchData();
  }, []); */

  useEffect(() => {
    const fetchAxios = async () => {
      const { data } = await axiosInstance.get('/posts/');

      setList(orderBy(data, ['title']));
      /* const formatData = data.map((item) => {
        return {
          ...item,
          title: capitalize(item.title),
        };
      });
      const orderedData = orderBy(formatData, ['title']);
      console.log(orderedData); */
    };
    fetchAxios();
  }, []);

  console.log(DateTime.now().toLocaleString());

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <div>{DateTime.now().toFormat('dd LLL yyyy')}</div>
        <div>{format(new Date(1995, 1, 1), 'yyyy-MM-dd')}</div>
        <div>{moment('1995-01-02').add(3, 'days').format()}</div>
        <button
          onClick={() => {
            handleOnClick();
          }}
        >
          Sort by title
        </button>
        {list.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
      </header>
    </div>
  );
}

export default App;
