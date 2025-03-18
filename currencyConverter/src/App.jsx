import { useEffect, useState } from "react";
import Tab from "./components/Tab";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App(){
    let [fromCurrency, setFromCurrency] = useState('usd');
    let [toCurrency, setToCurrency] = useState('inr');
    let [fromAmount, setFromAmount] = useState(0);
    let [toAmount, setToAmount] = useState(0);
    let currencyData = useCurrencyInfo(fromCurrency);
    // let [currencyData, setCurrencyData] = useState({});

    // useEffect(() => {
    //     fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`).then(response => response.json()).then(result => setCurrencyData(result[fromCurrency]));
    // }, [fromCurrency])

    let conversionRate = currencyData[toCurrency];
    let allCurrencies = Object.keys(currencyData);

    const convertAmount = () => {
        setToAmount(fromAmount * conversionRate);
    }

    let swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setToAmount(fromAmount / conversionRate);
    }

    return (
        <div className="w-full min-h-screen bg-[url('./assets/currency.jpg')] bg-cover flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-extrabold italic uppercase md:text-4xl m-5 text-center">Currency Converter</h1>

            <div className="p-5 w-10/12 bg-white bg-opacity-20 border rounded flex flex-col items-center  md:w-3/5 lg:w-1/2">

                <Tab title="From" currency={fromCurrency} inputNameId="from_amount" selectorNameId="from_currency" value={fromAmount} allCurrencies={allCurrencies} onAmountChange={setFromAmount} onCurrencyChange={setFromCurrency} />

                <button onClick={swap} className="bg-blue-900 text-white text-sm py-2 px-5 rounded border border-white -my-2 z-10">Swap</button>

                <Tab title="To" currency={toCurrency} inputNameId="to_amount" selectorNameId="to_currency" value={toAmount} allCurrencies={allCurrencies} onAmountChange={setToAmount} onCurrencyChange={setToCurrency} readOnly={true} />

                <button onClick={convertAmount} className="bg-blue-900 rounded p-2 w-full text-white mt-4 uppercase">Convert {fromCurrency} to {toCurrency}</button>
            </div>
        </div>
    );
}

export default App;