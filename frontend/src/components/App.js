import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wrapper from "./layout/Wrapper";
import NavBar from "./layout/NavBar";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Footer from "./layout/Footer";

function App(){
        return (

            <Router>
                <NavBar />

                <Wrapper custom_cls='min_height'>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/new-project' element={<NewProject/>}/>
                        <Route path='/projects' element={<Projects/>}/>
                        <Route path='/project/:slug' element={<Project/>}/>
                    </Routes>
                </Wrapper>

                <Footer />

            </Router>
            )

}

export default App