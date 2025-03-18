import { useEffect, useState } from "react";

function useCurrencyInfo(fromCurrency){
    const [data, setData] = useState({}); 

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`).then(response => response.json()).then(result => setData(result[fromCurrency]));
    }, [fromCurrency]);

    return data;
}

export default useCurrencyInfo;