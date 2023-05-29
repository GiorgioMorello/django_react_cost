import React, {useEffect, useState} from 'react'






function Messages({msg, type}) {
    const [visable, setVisable] = useState(false);


    useEffect(()=>{

        if(!msg) {
            setVisable(false);
            return
        }

        setVisable(true)

        const timer = setTimeout(()=>{
            setVisable(false)
        }, 3000)


        return ()=>clearTimeout(timer)


    }, [msg])


    return(
        <>
            {visable && (<div className={`${type} message`}> {msg} </div>)}
        </>
    )
}


export default Messages