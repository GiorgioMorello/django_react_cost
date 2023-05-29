
import React, {useState, useEffect} from 'react'
import Input from "../input/Input";
import getCookie from "../../../GetCsrfToken";
import CsrfTokenInput from "../input/CsrfTokenInput";
import SubmitBtn from "./SubmitBtn";

function ServiceForm({handle_submit, project_data, btn_text}) {

    const [service, setService] = useState({})


    function submit(e){
        e.preventDefault();
        let csrf_token = getCookie('csrftoken');
        handle_submit(csrf_token, service, project_data);


    }

    function on_change_input(e){
        setService({...service, [e.target.name]: e.target.value});

    }



    return(
        <form onSubmit={submit} method='POST'  ><CsrfTokenInput />
            <Input type='text' name='name' handle_onchange={on_change_input} text_holder='Nome do serviço' text_label='Insira o nome do serviço'/>

            <Input type='number' name='cost' handle_onchange={on_change_input} text_holder='Custo do serviço' text_label='Insira o custo do serviço'/>

            <Input type='text' name='description' handle_onchange={on_change_input} text_holder='Descrição' text_label='Insira a descrição do serviço'/>

            <SubmitBtn  text={btn_text}/>
        </form>

    )
}


export default ServiceForm