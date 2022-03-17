import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false, 
    operation: null,
    values: [0, 0],  // array que vai mexer nos numeros
    current: 0  // pra saber qual dos valores do array ele ta mexendo
}

export default class Calculator extends Component {  // dar uma olhada nessa nomenclatura

    state = { ...initialState}  // criou um clone e atribuiu a state
   
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

   clearMemory() {
       this.setState({ ...initialState})  // ... significa que pode receber mais de um parametro
   }

   setOperation(operation) {
       if (this.state.current === 0) {
           this.setState({operation, current: 1, clearDisplay: true})
       } else {
           const equals = operation === '='
           const currentOperation = this.state.operation

           const values = [...this.state.values]
           try {
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
           } catch(e) {
            values[0] = this.state.values[0]
           }
           
           values[1] = 0

           this.setState({
               displayValue: values[0],
               operation: equals ? null : operation,
               current: equals ? 0 : 1,
               clearDisplay: !equals,
               values
           })
       }
   }

   addDigit(n) {
       if (n === '.' && this.state.displayValue.includes('.')) {
           return 
       }

       const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay == true  // tira os zeros a esquerda
       const currentValue = clearDisplay ? '' : this.state.displayValue
       const displayValue = currentValue + n
       this.setState({ displayValue, clearDisplay: false})

       if (n !== '.') { // se for diferente de . significa que é um numero de 0 à 9... essa é a validação
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
       }
   }
   
    render () {


        return (
            <div className='calculator'>  
                <Display value={this.state.displayValue}></Display> 
                <Button label='AC' click={this.clearMemory} triple></Button>
                <Button label='/' click={this.setOperation} operation></Button>
                <Button label='7' click={this.addDigit}></Button>
                <Button label='8' click={this.addDigit}></Button>
                <Button label='9' click={this.addDigit}></Button>
                <Button label='*' click={this.setOperation} operation></Button>
                <Button label='4' click={this.addDigit}></Button>
                <Button label='5' click={this.addDigit}></Button>
                <Button label='6' click={this.addDigit}></Button>
                <Button label='-' click={this.setOperation} operation></Button>
                <Button label='1' click={this.addDigit}></Button>
                <Button label='2' click={this.addDigit}></Button>
                <Button label='3' click={this.addDigit}></Button>
                <Button label='+' click={this.setOperation} operation></Button>
                <Button label='0' click={this.addDigit} double></Button>
                <Button label='.' click={this.addDigit}></Button>
                <Button label='=' click={this.setOperation} operation></Button>

            </div>
        )
    }
}

// class é uma palavra reservada da linguagem java, por isso usa classname
// a div nao é html, é jsx que vai ser convertido pra js puro
// tirou o app do index.js e colocou Calculator no lugar.
// tem que dar import no component !!!! 
// dar uma visada em construtor, super etc