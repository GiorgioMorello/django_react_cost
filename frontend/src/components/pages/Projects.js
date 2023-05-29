import React, {useState, useEffect} from 'react'
import Messages from "../layout/Messages";
import {useLocation} from "react-router-dom";
import LinkBtn from "../layout/LinkBtn";
import ProjectCard from "../layout/card/ProjectCard";
import Loading from "../layout/Loading";
import getCookie from "../../GetCsrfToken";

function Projects() {


    const location = useLocation();
    const [projects, setProjects] = useState([])
    const [load, setLoader] = useState(false);
    const [project_msg, setProjectMsg] = useState('')
    const [type_msg, setType] = useState('');





    let message = '';
    if(location.state){

        message = location.state.message;
    }



    useEffect(()=>{

        setTimeout(()=>{
            fetch('/api/projects').then((resp)=>{
            return resp.json()
        }).then((data)=>{
            console.log(data);
            setProjects(data);
            setLoader(true)
        })
        }, 2000)


    }, [])


    function remove_project(id) {
        setProjectMsg('')
        let csrftoken = getCookie('csrftoken');

        fetch('/api/remove-project', {
            method: 'DELETE',
            headers: {'Content-Type': 'Application/json', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({'id': id}),
        }).then((resp)=>{
            if(!resp.ok){
                setProjectMsg('Falha ao remover o projeto');
                setType('error');
                return
            }
            return resp.json()
        }).then((data)=>{
            console.log(data)
            setProjectMsg('Projeto removido');
            setType('success');
            setProjects(data.projects);
        })

    }




    return(
        <div>
            {message && <Messages type='success' msg={message}/>}
            {project_msg && <Messages type={type_msg} msg={project_msg}/>}

            <div className='title_container'>
                <h1>Meus Projetos</h1>
                <LinkBtn text='Novo Projeto' url='/new-project' />
            </div>


            <div className='projects_container'>
                {projects && projects.map((project)=> (
                    <ProjectCard on_delete={remove_project} project_data={project} />

                ) )}
            </div>


            {!load && <Loading />}
            {projects.length === 0 && load && <p className='text_center'>
                Nenhum projeto foi criado
            </p>}

        </div>
    )
}


export default Projects