import React from 'react'


function Input({type, name, value, text_holder, text_label, handle_onchange}) {


    return(
        <div className='form_control'>
            <label htmlFor={name}>{text_label}</label>
            <input required value={value} type={type} name={name} id={name} onChange={handle_onchange} placeholder={text_holder}/>
        </div>
    )
}


export default Input