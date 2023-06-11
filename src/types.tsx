export interface Money {
    name: string,
    displayName: string,
    type: 'coin' | 'bill'
    value: number,
    amount: number,
    enabled: boolean
}

export interface MoneyInputProps {
    name: string,
    displayName: string,
    enabled: boolean,
    amount: number,
    handleMoney: Function
}
export interface MainProps {
    money: Money[],
    handleMoney: Function,
    change: number,
    setChange: Function,
    changeBack: string,
    setChangeBack: Function,
    paid: number,
    setPaid: Function,
    cost: number,
    setCost: Function,
    totalAfterTax: number,
    taxRate: number
    setTotalAfterTax: Function,
    setTaxRate: Function
}