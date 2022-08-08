import './BalanceWallet.css';
import { useEffect, useState, useRef } from 'react';


function BalanceWallet () {

    const [submit, setSubmit] = useState(false);
    const [address, setAddress] = useState('');
    const [coin, setCoin] = useState('');
    const coinInfo = useRef(null);

    function handleSubmit (e) {
        e.preventDefault();
        setAddress(e.target.address.value);
        setSubmit(!submit);
        e.target.reset();
    };

    useEffect(() => {
        if (!!address) {
            async function fetchMyAPI() {
                const responce = await fetch(`https://btcbook.guarda.co/api/address/${address}`, {
                    method: "GET"
                });
                const result = await responce.json();
                setCoin(result);
            }
            fetchMyAPI()
        }

    }, [submit])

    function handleClick () {
        async function fetchMyAPI() {
            const responce = await fetch(`https://btcbook.guarda.co/api/address/${address}`, {
                method: "GET"
            });
            const result = await responce.json();
            const arrRes = []
            for (let key in result) {
                arrRes.push(`${key}, ${result[key]}`);
            }
            const blob = new Blob([arrRes.join('\n')], {type : 'text/scv'});
            let url = window.URL.createObjectURL(blob);
            let anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'balance.csv';
            document.body.append(anchor);
            anchor.style = 'display: none';
            anchor.click();
            anchor.remove();
        }
        fetchMyAPI()
    }
    return (
        <>
            <h2 className='text-center mb-2'>Проверка баланса кошелька BTC</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form-wallet d-flex">
                    <input type="text" className='form-wallet__input form-control me-3' name='address' placeholder='Введите номер кошелька'/>
                    <button className='form-wallet__btn btn btn-warning' type='submit'>Узнать баланс</button>
            </form>
            {coin &&
                <div className='result-wallet' ref={coinInfo}><p className="result-wallet__info">Баланс кошелька {coin.addrStr} = {coin.balance}</p><a className='btn btn-success' href="#" onClick={handleClick}>Скачать</a></div>
            }
        </>
    )
}

export default BalanceWallet;