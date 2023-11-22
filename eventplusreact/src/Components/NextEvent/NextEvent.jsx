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
import { Swiper, SwiperSlide } from 'swiper/react'


const NextEvent = ( {title, description, eventDate, idEvento, data} ) => {
    register();
    const [slidesPerView, setSlidePerView] = useState(2);

    function conectar(idEvento) {
        alert(`Conectado ao evento: ${idEvento}`)
    }

    return (
        // <Swiper
        // >
        // {data.map((item) =>
        //  <SwiperSlide key={item.id}>
                
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
        // </SwiperSlide>
        
        // )}
           
        // </Swiper>
    );
};

export default NextEvent;