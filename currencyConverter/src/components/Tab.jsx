function Tab({title, currency, inputNameId, selectorNameId, value, allCurrencies, onAmountChange, onCurrencyChange, readOnly}){
    return (
        <div className="flex flex-col w-full bg-white p-4 rounded md:flex-row md:justify-between">
            <div className="w-full flex flex-col md:w-5/12">
                <label htmlFor={inputNameId} className="text-gray-700 text-sm my-1">{title}</label>
                <input type="number" name={inputNameId} id={inputNameId} className="border border-gray-400 rounded p-1" value={value} onChange={(e) => onAmountChange(Number(e.target.value))} readOnly={readOnly} /> 
            </div>

            <div className="w-full flex flex-col md:w-5/12">
                <label htmlFor={selectorNameId} className="text-gray-700 text-sm my-1">Currency Type</label>
                <select name={selectorNameId} id={selectorNameId} className="bg-gray-200 rounded p-2 text-sm uppercase" defaultValue={currency} onChange={(e) => onCurrencyChange(e.target.value)}>{
                    allCurrencies.map(curr => (
                        <option key={curr} value={curr} selected={curr === currency ? true : false}>{curr}</option> 
                    ))
                    }</select>
            </div>
        </div>
    );
}

export default Tab;