import React from 'react'
import './Button.css'

export default props => {
    

    return (
        <button onClick={e => props.click(props.label)} className={`button 
    ${props.operation ? 'operation' : ''}
    ${props.double ? 'double' : ''}
    ${props.triple ? 'triple' : ''}
    `}>
        {props.label}
    </button>
    )
    }




// quanto mais componente sem estado, melhor pra aplicação
// dentro de template string ( ou seja, {}), usa javascript puro