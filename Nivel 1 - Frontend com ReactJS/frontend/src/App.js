import React from 'react'

import Header from './components/Header'

function App() {
    return (
        <>
            <Header title="Homepage">
                <ul>
                    <li>Home</li>
                    <li>Projetos</li>
                </ul>
            </Header> 
            <Header title="Projects" />
        </>
        
    )
}

export default App