import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';

// Import dos componentes da página:
import HomePage from './Pages/HomePage/HomePage';
import TipoEventosPage from './Pages/TipoEventosPage/TipoEventosPage';
import EventosPage from './Pages/EventosPage/EventosPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import TestePage from './Pages/TestePage/TestePage';

const Rotas = () => {
    return (
        <div>
            <BrowserRouter>
            <Header />
            <Routes>
                <Route element= {<HomePage />} path='/' exact />
                <Route element= {<TipoEventosPage />} path='/tipo-evento' />
                <Route element= {<EventosPage />} path='/eventos' />
                <Route element= {<LoginPage />} path='/login' />
                <Route element= {<TestePage />} path='/testes' />
            </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Rotas;