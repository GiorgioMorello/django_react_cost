import React from 'react';


function Wrapper(props){

    return(
        <div className={`wrapper ${props.custom_cls} ${props.flex_cls && 'flex'}`}>
            {props.children}
        </div>
    )

}

export default Wrapper