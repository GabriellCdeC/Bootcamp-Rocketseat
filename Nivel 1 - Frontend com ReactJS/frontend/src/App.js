import React, { useState } from 'react'
import Header from './components/Header'

import './App.css'
import backgroundImage from './assets/oliver-niblett-wh-7GeXxItI-unsplash.jpg'


function App() {



    function handleAddProject(){
    
        setProjects([...projects, `Novo Projeto ${Date.now()}`])

    }

    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web'])

    return (
        <>
            <Header title="Projects" />

            <img width="300"  src={backgroundImage} alt="background image"/>

            <ul>
                {
                    projects.map(project => <li key={project}>{project}</li> )
                }
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
        
    )
}

export default App