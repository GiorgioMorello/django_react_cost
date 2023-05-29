
import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {BsFillTrashFill, BsPencil} from "react-icons/bs";
import getCookie from "../../../GetCsrfToken";

function ServiceCard({handle_remove, service, btn_text}) {


    function remove(e){
        const csrftoken = getCookie('csrftoken');
        console.log(csrftoken);
        handle_remove(service.id, csrftoken);
    }



    return(
        <div className='project_card'>

            <div className='project_info'>
                <h4>{service.name}</h4>
                <p><span>
                    Custo do serviço:
                </span>
                R${service.cost}
                </p>
                <p>{service.description}</p>

                <div className='project_card_actions'>
                    <button type='button' onClick={remove}>
                        <BsFillTrashFill /> Remover
                    </button>
                </div>
            </div>

        </div>

    )
}


export default ServiceCard