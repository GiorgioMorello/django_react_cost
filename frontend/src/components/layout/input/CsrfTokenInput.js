import React from 'react'
import getCookie from "../../../GetCsrfToken";




function CsrfTokenInput(){

    let cookie = getCookie('csrftoken')


    return (
        <>
            <input type='hidden' value={cookie} name='csrfmiddlewaretoken'/>
        </>

    )
}

export default CsrfTokenInput