import React from 'react'


function Select({name, options, text_label, handle_onchange, value}) {





    return(
        <div className='form_control'>
            <label htmlFor={name}>{text_label}</label>
            <select required name={name} id={name} onChange={handle_onchange}>
                <option>Selecione uma opção</option>
                {options && options.map((option)=>(
                    <option value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}


export default Select