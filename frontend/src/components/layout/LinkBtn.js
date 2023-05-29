import React from 'react';
import {Link} from 'react-router-dom'

function LinkBtn({url, text}){

    return (
        <>
            <Link className='link_btn' to={url}>{text}</Link>
        </>
    )

}


export default LinkBtn