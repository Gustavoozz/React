import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import './Swiper.css'
import NextEvent from '../NextEvent/NextEvent';

import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default class Carrossel extends React.Component {
    render() {
    return (
        <Swiper 
        modules={[Navigation, Pagination]}
        navigation={true}
        className="swiper-container">
            <SwiperSlide className='slide-item'>
            <NextEvent />
            </SwiperSlide>
        </Swiper>
    );
};
}
