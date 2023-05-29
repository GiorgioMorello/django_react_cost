import React from 'react'
import savings from '../../../static/img/savings.svg'
import LinkBtn from "../layout/LinkBtn";

function Home() {


    return(


            <section className='home_container'>
                <h1>Bem-Vindo ao <span>Costs</span></h1>
                <p>Comece a gerenciar seus projeto agora mesmo</p>
                <LinkBtn text='Criar Projeto' url='/new-project'/>
                <img src={savings} alt='costs' />

            </section>

    )
}


export default Home