import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

// Import dos componentes da página:
import HomePage from '../Pages/HomePage/HomePage';
import TipoEventosPage from '../Pages/TipoEventosPage/TipoEventosPage';
import EventosPage from '../Pages/EventosPage/EventosPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import { PrivateRoute } from './PrivateRoute';


const Rotas = () => {
    return (
        <div>
            <BrowserRouter>
            <Header />
            <Routes>
                <Route element= {<HomePage />} path='/' exact />
                <Route path='/tipo-eventos'
                element= {
                <PrivateRoute redirectTo="/">
                <TipoEventosPage />
                </PrivateRoute>}  
                />

                <Route path='/eventos' 
                element= {
                <PrivateRoute redirectTo="/">
                <EventosPage />
                </PrivateRoute>} 
                />

                <Route path='/eventos-aluno'
                element= {
                <PrivateRoute redirectTo="/">
                <EventosPage />
                </PrivateRoute>}  
                />

                <Route element= {<LoginPage />} path='/login' />
            </Routes>
            <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Rotas;