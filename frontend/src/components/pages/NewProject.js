import React, { useState, useEffecte } from 'react'
import ProjectForm from "../layout/form/ProjectForm";
import { useNavigate } from 'react-router-dom'
import Messages from "../layout/Messages";



function NewProject() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    function create_post(csrftoken, project) {

        fetch('/api/create-project', {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'X-CSRFToken': csrftoken},
            body: JSON.stringify(project),
        }).then((resp)=>{
            return resp.json()
        }).then((data)=>{
            console.log(data);
            navigate('/projects', {state: {message: 'Projeto criado'}})
        }).catch((error)=>{
            setVisible(true);
        })


    }




    return(

        <>
            {visible && <Messages type='error' msg='Nome de projeto já existente'/>}

            <div className='new_project_container'>

                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <p>Formulário</p>
                <ProjectForm handle_submit={create_post} btn_text='Criar projeto' />
            </div>
        </>
    )
}


export default NewProject