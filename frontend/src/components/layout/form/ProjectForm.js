import React, {useState, useEffect} from 'react'
import Input from "../input/Input";
import Select from "../input/Select";
import SubmitBtn from "./SubmitBtn";
import CsrfTokenInput from "../input/CsrfTokenInput";
import getCookie from "../../../GetCsrfToken";

function ProjectForm({handle_submit, project_data, btn_text}) {


    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(project_data || {});


    function submit(e){
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        console.log(project)

        handle_submit(csrftoken, project)
    }

    function handle_onchange(e){
        console.log(project)
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handle_onchange_cat(e){
        setProject({...project,
            category: {id: parseInt(e.target.value),
                category_name: e.target.options[e.target.selectedIndex].text}
        });
    }

    useEffect(()=>{


        fetch('/api/categories').then((resp)=>{
            return resp.json();
        }).then((data)=>{
            console.log(data)
            setCategories(data);
        }, )

    }, [])


    return(

        <form onSubmit={submit} method='POST' className='form'><CsrfTokenInput />
            <div>
                <Input type='text' name='name' text_label='Nome do projeto'
                        text_holder='Digite o nome do projeto' handle_onchange={handle_onchange}
                       />
            </div>
            <Input value={project.budget ? project.budget : ''} type='number'
                   text_holder='Orçamento do projeto'
                   text_label='Insira o orçamento total'
                   handle_onchange={handle_onchange} name='budget' />

            <Select value={project.category ? project.category.id : ''} options={categories} name='category' handle_onchange={handle_onchange_cat}/>

            <SubmitBtn text={btn_text}/>
        </form>
    )
}


export default ProjectForm