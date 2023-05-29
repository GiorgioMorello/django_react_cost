import React, {useState, useEffect} from 'react'
import loading from '../../../static/img/loading.svg'


function Loading() {



    return (
        <div className='loader'>
            <img src={loading} alt="Loader"/>
        </div>
    )
}


export default Loading