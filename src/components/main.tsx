import React from "react";
import {MainProps} from "../types";
const taxRates = [
    { state: 'None', value: 1.0 },
    { state: 'Alabama', value: 1.04 },
    { state: 'Alaska', value: 1.0 },
    { state: 'Arizona', value: 1.056 },
    { state: 'Arkansas', value: 1.065 },
    { state: 'California', value: 1.0725 },
    { state: 'Colorado', value: 1.029 },
    { state: 'Connecticut', value: 1.0635 },
    { state: 'Delaware', value: 1.0 },
    { state: 'District of Columbia', value: 1.06 },
    { state: 'Florida', value: 1.06 },
    { state: 'Georgia', value: 1.04 },
    { state: 'Hawaii', value: 1.04 },
    { state: 'Idaho', value: 1.06 },
    { state: 'Illinois', value: 1.0625 },
    { state: 'Indiana', value: 1.07 },
    { state: 'Iowa', value: 1.06 },
    { state: 'Kansas', value: 1.065 },
    { state: 'Kentucky', value: 1.06 },
    { state: 'Louisiana', value: 1.0445 },
    { state: 'Maine', value: 1.055 },
    { state: 'Maryland', value: 1.06 },
    { state: 'Massachusetts', value: 1.0625 },
    { state: 'Michigan', value: 1.06 },
    { state: 'Minnesota', value: 1.0688 },
    { state: 'Mississippi', value: 1.07 },
    { state: 'Missouri', value: 1.0422 },
    { state: 'Montana', value: 1.0 },
    { state: 'Nebraska', value: 1.055 },
    { state: 'Nevada', value: 1.0685 },
    { state: 'New Hampshire', value: 1.0 },
    { state: 'New Jersey', value: 1.0663 },
    { state: 'New Mexico', value: 1.0513 },
    { state: 'New York', value: 1.04 },
    { state: 'North Carolina', value: 1.0475 },
    { state: 'North Dakota', value: 1.05 },
    { state: 'Ohio', value: 1.0575 },
    { state: 'Oklahoma', value: 1.045 },
    { state: 'Oregon', value: 1.0 },
    { state: 'Pennsylvania', value: 1.06 },
    { state: 'Rhode Island', value: 1.07 },
    { state: 'South Carolina', value: 1.06 },
    { state: 'South Dakota', value: 1.045 },
    { state: 'Tennessee', value: 1.07 },
    { state: 'Texas', value: 1.0625 },
    { state: 'Utah', value: 1.061 },
    { state: 'Vermont', value: 1.06 },
    { state: 'Virginia', value: 1.053 },
    { state: 'Washington', value: 1.065 },
    { state: 'West Virginia', value: 1.06 },
    { state: 'Wisconsin', value: 1.05 },
]
const taxOptions = taxRates.map((i)=><option key={i.state} value={i.value}>{i.state} ({(+(i.value*100).toString().split('0')[1]).toPrecision(3)}%)</option>)

export default function Main({money, handleMoney, setTaxRate, taxRate, setTotalAfterTax, totalAfterTax, change, setChange,paid,cost, setPaid, setCost, changeBack, setChangeBack}: MainProps){
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        switch(e.target.id){
            case 'amountPaid':
                setPaid(e.currentTarget.valueAsNumber);
                setChange((e.currentTarget.valueAsNumber*100 - totalAfterTax*100)/100);
                break;
            case 'totalCost':
                setCost(e.currentTarget.valueAsNumber);
                setChange((paid*100 - e.currentTarget.valueAsNumber * taxRate*100)/100);
                setTotalAfterTax(+(e.currentTarget.valueAsNumber * taxRate).toFixed(2))
                break;
            case 'changeDue':
                setChange(e.currentTarget.valueAsNumber);
                break;
        }
    }
    function getChangeBack(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()

        let output: Array<{name: string, count: number}> = [];
        function doMath(a: number,b: number): number {
            if (a / b >= 1 && Math.floor(a/b) <= money.find((d)=>d.value===b)!.amount ) {
                let amount = Math.floor(a/b)

                handleMoney(money.find((d)=>d.value===b)!.name, 'amount', money.find((d)=>d.value===b)!.amount - amount )
                output.push({name: money.find((d)=>d.value===b)!.name, count: amount})
                return a % b;
            } else if (a / b >= 1) {
                let amount = money.find((d)=>d.value===b)!.amount;

                handleMoney(money.find((d)=>d.value===b)!.name, 'amount', money.find((d)=>d.value===b)!.amount - amount )
                output.push({name: money.find((d)=>d.value===b)!.name, count: amount})
                return a - (b * amount);
            } else {
                return a
            }
        }
        money.filter((d)=>d.enabled && d.amount>0).map(i=>i.value).reduce(doMath, change*100)
        let cb = output.map((i)=><code key={i.name}>{money.find((d)=>d.name===i.name)?.displayName}: {i.count}</code>)
        setChangeBack(cb);
    }
    return(
        <div className='flex flex-col m-auto justify-center text-center gap-2'>
            <div className='flex gap-16'>
                <div className='flex flex-col'>
                    <label htmlFor='main'>Cost Before Tax</label>
                    <input className='w-20 m-auto border' step='0.01'  type="number" id='totalCost' onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor=''>Sales Tax</label>
                    <select id='taxRate' onChange={(e)=>{ setTaxRate(e.target.value); setTotalAfterTax((cost * +e.target.value)) }}>
                        {taxOptions}
                    </select>
                </div>

            </div>
            <div className='flex flex-col'>
                <label htmlFor=''>Total Cost</label>
                <code>${+totalAfterTax.toFixed(2)}</code>
            </div>
            <label htmlFor='main'>Amount Paid</label>
            <input className='w-20 m-auto border' type="number" step='0.01' id='amountPaid' onChange={handleChange} />
            <label htmlFor='main'>Change Due</label>
            <input className='w-20 m-auto border' type="number" step='0.01' id='changeDue' value={change.toFixed(2)} onChange={handleChange} />
            <button className='bg-gray-600 text-white rounded-full' onClick={getChangeBack}>Calculate</button>
            <code className='flex flex-col text-right'>{changeBack===''? '' : changeBack}</code>
        </div>
    )
}