import React, {useState} from 'react';
import Form from "./components/Form";
import {Money} from "./types";
import Main from "./components/main";

function App() {
    const defaultPennies: Money = { name: 'pennies', displayName: 'Pennies',  type: 'coin', value: 1, amount: 100, enabled: true },
          defaultNickels: Money = { name: 'nickels', displayName: 'Nickels', type: 'coin', value: 5, amount: 100, enabled: true },
          defaultDimes: Money = { name: 'dimes',   displayName: 'Dimes', type: 'coin', value: 10, amount: 100, enabled: true },
          defaultQuarters: Money = { name: 'quarters',displayName: 'Quarters', type: 'coin', value: 25, amount: 100, enabled: true },
          defaultDollars: Money = { name: 'dollars',displayName: 'One Dollar Bills', type: 'bill', value: 100, amount: 100, enabled: true },
          default5Dollars: Money = { name: 'fiveDollars',displayName: 'Five Dollar Bills', type: 'bill', value: 500, amount: 100, enabled: true },
          default10Dollars: Money = { name: 'tenDollars',displayName: 'Ten Dollar Bills', type: 'bill', value: 1000, amount: 100, enabled: true },
          default20Dollars: Money = { name: 'twentyDollars',displayName: 'Twenty Dollar Bills', type: 'bill', value: 2000, amount: 100, enabled: true },
          default50Dollars: Money = { name: 'fiftyDollars', displayName: 'Fifty Dollar Bills',type: 'bill', value: 5000, amount: 100, enabled: true },
          default100Dollars: Money = { name: 'hundredDollars',displayName: 'One Hundred Dollar Bills', type: 'bill', value: 10000, amount: 100, enabled: true };
    const [pennies, setPennies] = useState(defaultPennies);
    const [nickels, setNickels] = useState(defaultNickels);
    const [dimes, setDimes] = useState(defaultDimes);
    const [quarters, setQuarters] = useState(defaultQuarters);
    const [dollars, setDollars] = useState(defaultDollars);
    const [fiveDollars, setFiveDollars] = useState(default5Dollars);
    const [tenDollars, setTenDollars] = useState(default10Dollars);
    const [twentyDollars, setTwentyDollars] = useState(default20Dollars);
    const [fiftyDollars, setFiftyDollars] = useState(default50Dollars);
    const [hundredDollars, setHundredDollars] = useState(default100Dollars);
    const [change, setChange] = useState(0);
    const [changeBack, setChangeBack] = useState('');
    const [cost, setCost] = useState(0);
    const [paid, setPaid] = useState(0);
    const [taxRate, setTaxRate] = useState(1.0);
    const [totalAfterTax, setTotalAfterTax] = useState(0);
    function handleMoney(name: string, change: string, value: number|boolean){
        switch (name){
            case 'pennies':
                setPennies((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'nickels':
                setNickels((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'dimes':
                setDimes((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'quarters':
                setQuarters((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'dollars':
                setDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'fiveDollars':
                setFiveDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'tenDollars':
                setTenDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'twentyDollars':
                setTwentyDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'fiftyDollars':
                setFiftyDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
            case 'hundredDollars':
                setHundredDollars((prevState)=> { return {...prevState, [change]: value} } )
                break;
        }
    }
    const money: Money[] = [hundredDollars, fiftyDollars, twentyDollars, tenDollars, fiveDollars, dollars, quarters, dimes, nickels, pennies];
  return (
    <div className="flex flex-col gap-20">
      <Form money={money} handleMoney={handleMoney}/>
        <Main cost={cost} setTaxRate={setTaxRate} setTotalAfterTax={setTotalAfterTax} taxRate={taxRate} totalAfterTax={totalAfterTax} setPaid={setPaid} paid={paid} setCost={setCost} money={money} handleMoney={handleMoney} change={change} setChange={setChange} changeBack={changeBack} setChangeBack={setChangeBack}/>
    </div>
  );
}

export default App;
