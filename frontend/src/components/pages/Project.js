import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, useLocation} from "react-router-dom";
import Loading from "../layout/Loading";
import ProjectForm from "../layout/form/ProjectForm";
import Messages from "../layout/Messages";
import ServiceForm from "../layout/form/ServiceForm";
import ServiceCard from "../layout/card/ServiceCard";

function Project() {

    const location = useLocation()
    const navigate = useNavigate();
    const slug = useParams().slug;
    const [project, setProject] = useState({});
    const [services, setServices] = useState([]);
    const [show_form, setShowForm] = useState(false);
    const [show_service_form, setShowServiceForm] = useState(false);
    const [project_msg, setProjectMsg] = useState('');
    const [msg_type, setMsgType] = useState('');
    const [show_msg, setShowMsg] = useState(false)



    function toggle_form(){
        setShowForm(!show_form);
    }

    function toggle_service_form(){
        setShowServiceForm(!show_service_form)
    }

    function remove_service(id, csrftoken){

        fetch(`/api/delete-service/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'Application/json', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({'project_id': project.id})
        }).then((resp)=>{
            if(!resp.ok){
                setProjectMsg('Serviço não encontrado');
                setMsgType('error');
                setShowMsg(true);
               return
            }
            return resp.json();
        }).then((data)=>{
            setProject(data.project);
            console.log(data)
            setServices(data.services)
            setProjectMsg('Serviço removido');
            setMsgType('success');
            setShowMsg(true);
        })

    }

    function edit_post(csrftoken, project){
        setProjectMsg('');
        setMsgType('');
        setShowMsg(false)

        if(project.budget < project.cost) {
            setProjectMsg('O orçamento total é menor que o custo ');
            setMsgType('error');
            setShowMsg(true);
        }

       fetch(`/api/update-project/${project.id}`, {
           method: 'PUT',
           headers: {'Content-Type': 'Application/json','X-CSRFToken': csrftoken},
           body: JSON.stringify(project),
       }).then((resp)=>{
           if(!resp.ok){
               console.log("ERROR");
               setProjectMsg('Nome de projeto ja existente');
               setMsgType('error');
               setShowMsg(true);
               return null
           }
           return resp.json()
       }).then((data)=>{

           setProject(data);
           setShowForm(false)

           navigate(`/project/${data.slug}`, {state: {message: 'Projeto atualizado'}})

       })
    }


    function service_submit(csrftoken, service, project_){
        setProjectMsg('');
        setMsgType('');
        setShowMsg(false);
        console.log(project_.id)

        fetch(`/api/add-service/${project_.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({'service': service})

        }).then((resp)=>{
            return resp.json();
        }).then((data)=>{
            if(data.check_valid_form){
                setProjectMsg('Preencha o formulário novamente')
                setMsgType('error');
                setShowMsg(true);
            }else if(data.check_new_cost){
                setProjectMsg('Orçamento ultrapassado')
                setMsgType('error');
                setShowMsg(true);
            }else if(data.project) {
                console.log(data)
                setProject(data.project);
                setServices(data.project_services);
                setShowServiceForm(false)
            }

        })
    }


    let message = '';
    if(location.state){
        message = location.state.message;
    }


    useEffect(()=>{

        setTimeout(()=>{
            fetch(`/api/project/${slug}`).then((resp)=>{
            if(!resp.ok){
                setProjectMsg('Projeto não encontrado');
                setMsgType('error')
                return
            }
            return resp.json();

            }).then((data)=>{
                setProject(data[0])
                setServices(data[1])
            })
        }, 1000)

    }, [slug])







    return(
        <>
            {show_msg && <Messages msg={project_msg} type={msg_type}/>}
            {message && <Messages msg='Projeto atualizado' type='success'/>}

            {project.name ?
                (
                    <div className='project_container'>
                        <div className='project_details'>
                            <h2>{project.name}</h2>
                            <button className='show_form_btn' onClick={toggle_form}>{show_form ? 'Fechar' : 'Editar Projeto'}</button>
                            <div className='project_info'>
                                <p className='capitalize'><span>Categoria: </span>{project.category}</p>
                                <p><span>Total de Orçamento: </span>R${project.budget}</p>
                                <p><span>Total Utilizado: </span>R${project.cost}</p>
                            </div>
                        </div>


                        {show_form && (
                            <div className= 'project_form_container'>
                            <ProjectForm project_data={project} btn_text="Editar" handle_submit={edit_post}/>
                        </div>
                        )}
                        <hr />

                        <div className='service_form'>
                            <h2>Adicione um serviço:</h2>
                            <button className='show_form_btn' onClick={toggle_service_form}>
                                {show_service_form ? 'Fechar' : 'Adcionar Serviço Projeto'}
                            </button>
                            {show_service_form &&
                                <ServiceForm project_data={project} btn_text='Enviar' handle_submit={service_submit}/>
                            }
                        </div>

                        <hr />
                        <h2>Serviços</h2>
                        <div className='projects_container' style={{margin: 0, justifyContent: "flex-start"}}>
                            {services.length > 0 && (
                                services.map((service)=>(
                                    <ServiceCard service={service} handle_remove={remove_service}/>
                                ))
                            ) }
                            {services.length === 0 && <p>Não há serviços cadastrados</p>}
                        </div>



                    </div>
                ) : <Loading />
            }
        </>
    )
}


export default Project