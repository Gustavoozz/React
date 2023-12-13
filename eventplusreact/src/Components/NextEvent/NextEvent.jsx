import React, { useState } from 'react';
import './NextEvent.css'
import { dateFormatDbToView } from '../../Utils/stringFunction'; 
import { Tooltip } from 'react-tooltip'

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from 'swiper/element/bundle'
    

const NextEvent = ( { title, description, eventDate, idEvento } ) => {


    function conectar(idEvento) {

        
        alert(`Conectado ao evento: ${idEvento}`)
    }

    return (
                
        <article className='event-card'>
            <h2 className='event-card__title'>{title}</h2>

            {/* Substr: Limitar os caractéres. */}
            <p 
            className='event-card__description'
            data-tooltip-id={idEvento}
            data-tooltip-content={description}
            data-tooltip-place="top"
            >
            <Tooltip id={idEvento} className='tooltip'/>
            {description.substr(0, 16)}...
            </p>

            <p className='event-card__description'>{new Date(eventDate).toLocaleDateString()}</p>
            {/* {dateFormatDbToView(eventDate)} */}

            <a onClick={() => {conectar(idEvento)}} className='event-card__connect-link' href="">Conectar</a>
           
        </article>
    );
};

export default NextEvent;

export const DetalhesEvents = ({ title, description, eventDate, idEvento }) => {
    function conectar(idEvento) {

      alert(`Chamar o recurso para conectar: ${idEvento}`);
    }
    return (
                
        <article className='event-card'>
            <h2 className='event-card__title'>{title}</h2>

            {/* Substr: Limitar os caractéres. */}
            <p 
            className='event-card__description'
            data-tooltip-id={idEvento}
            data-tooltip-content={description}
            data-tooltip-place="top"
            >
            <Tooltip id={idEvento} className='tooltip'/>
            {description.substr(0, 16)}...
            </p>

            <p className='event-card__description'>{new Date(eventDate).toLocaleDateString()}</p>
            {/* {dateFormatDbToView(eventDate)} */}

            <a onClick={() => {conectar(idEvento)}} className='event-card__connect-link' href="">Conectar</a>
           
        </article>
    );
};