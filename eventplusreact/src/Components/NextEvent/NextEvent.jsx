import React from 'react';
import './NextEvent.css'
import { dateFormatDbToView } from '../../Utils/stringFunction'; 
import { Tooltip } from 'react-tooltip'

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const NextEvent = ( {title, description, eventDate, idEvento} ) => {

    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        // Optional parameters
        direction: 'vertical',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });


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

            <p className='event-card__description'>{dateFormatDbToView(eventDate)}</p>

            <a onClick={() => {conectar(idEvento)}} className='event-card__connect-link' href="">Conectar</a>
        </article>
    );
};

export default NextEvent;