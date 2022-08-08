import './App.css';
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BalanceWallet from '../BalanceWallet/BalanceWallet';

function App() {

  const [crypto, setCrypto] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function fetchMyAPI() {
      const responce = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}`, {
        method: "GET"
      });
      const result = await responce.json();
      setCrypto(result.data);
    }
    fetchMyAPI()
  }, [limit])

  // useEffect(() => {
  //   if (!!address) {
  //     async function fetchMyAPI() {
  //       const responce = await fetch(`https://btcbook.guarda.co/api/address/${address}`, {
  //         method: "GET"
  //       });
  //       const result = await responce.json();
  //       console.log(result);
  //       setCoin(result);
  //     }
  //     fetchMyAPI()
  //   }
      
  // }, [submit])

  // function handleSubmit (e) {
  //   e.preventDefault();
  //   setAddress(e.target.address.value);
  //   setSubmit(!submit);
  //   e.target.reset();
  // };
  
  // function handleClick () {
  //   async function fetchMyAPI() {
  //     const responce = await fetch(`https://btcbook.guarda.co/api/address/${address}`, {
  //       method: "GET"
  //     });
  //     const result = await responce.json();
  //     const arrRes = []
  //     for (let key in result) {
  //       arrRes.push(`${key}, ${result[key]}`);
  //     }
  //     const blob = new Blob([arrRes.join('\n')], {type : 'text/scv'});
  //     let url = window.URL.createObjectURL(blob);
  //     let anchor = document.createElement('a');
  //     anchor.href = url;
  //     anchor.download = 'balance.csv';
  //     document.body.append(anchor);
  //     anchor.style = 'display: none';
  //     anchor.click();
  //     anchor.remove();
  //   }
  //   fetchMyAPI()
  // }
  return (
    <div className="App">
      <div className="container">
        <BalanceWallet/>
        <h2 className='text-center mt-5 mb-2'>Список криптовалюты</h2>
        <ul className="crypto-list list-group">
          <li className='list-group-item active'>
            <div className="row text-center">
              <div className='col-4'>Rank</div>
              <div className='col-4'>Name</div>
              <div className='col-4'>priceUsd</div>
            </div>
          </li>
          {crypto.map(item => (
            <li className='list-group-item' key={uuidv4()}>
              <div className="row text-center">
                <div className='col-4'>{item.rank}</div>
                <div className='col-4'>{item.name}</div>
                <div className='col-4'>{item.priceUsd}</div>
              </div>
            </li>
          ))}
        </ul>
        
        <button className='crypto-list-btn btn btn-primary' onClick={() => setLimit((prev) => prev + 10)}>Показать еще 10</button>
      </div>
    </div>
  );
}

export default App;
