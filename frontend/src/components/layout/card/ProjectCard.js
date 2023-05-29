import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";


function ProjectCard({project_data, on_delete}) {


    function remove(e){
        e.preventDefault();
        on_delete(project_data.id);
    }

    return(
        <div className='project_card'>
            <div className='project_info'>
                <h4>{project_data.name}</h4>
                <p><span>
                    Orçamento:
                </span>
                R${project_data.budget}
                </p>
                <p className='category_type'><span className={project_data.category === 'Banco de Dados' ? 'banco_dados': project_data.category} >

                </span>
                    {project_data.category}
                </p>

                <div className='project_card_actions'>
                    <Link to={`/project/${project_data.slug}`}><BsPencil /> Editar</Link>
                    <button type='button' onClick={remove}>
                        <BsFillTrashFill /> Remover
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ProjectCard