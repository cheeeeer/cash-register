import {Money, MoneyInputProps} from "../types";
export default function Form(props: {money: Money[], handleMoney: Function }) {
    const {money, handleMoney} = props;
    const formInputs = money.map((i: Money) => <MoneyInput key={i.name} name={i.name} displayName={i.displayName} enabled={i.enabled} amount={i.amount} handleMoney={handleMoney}/>)
    return(
        <div>
            <h3 className='text-2xl'>Register Contents</h3>
            <form className='flex gap-5'>
                {formInputs}
            </form>
        </div>
    )
}

function MoneyInput({name, displayName, enabled, amount, handleMoney}: MoneyInputProps) {
    return (
        <fieldset className='flex-col' key={name}>
            <div className='flex'>
                <label htmlFor={name}>{displayName} </label>
                <input type='checkbox' checked={enabled} onChange={()=>{handleMoney(name,'enabled', !enabled)}}/>
            </div>
            <input className='w-14 border' type='number' disabled={!enabled} id={name} value={amount} onChange={(e)=>{handleMoney(name,'amount',e.currentTarget.valueAsNumber)}}/>

        </fieldset>
    )
}