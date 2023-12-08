import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css'
import Title from '../../Components/Title/Title';

import MainContent from '../../Components/MainContent/MainContent';
import Banner from '../../Components/Banner/Banner'
import VisionSection from '../../Components/VisionSection/VisionSection';

import ContactSection from '../../Components/ContactSection/ContactSection';
import NextEvent from '../../Components/NextEvent/NextEvent';
import Container from '../../Components/Container/Container'

import axios from 'axios';
import api from '../../Services/Service'
import { UserContext } from '../../context/AuthContext';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

import { Pagination } from "swiper/modules";



const HomePage = () => {
const {userData} = useContext(UserContext)

    useEffect(() => {
        // Chamar a API:
        async function getProximosEventos() {
            try {
            const promise = await api.get("/Evento/ListarProximos"); 
            
            
            setNextEvents(promise.data)

            } catch (error) {
              alert('Erro!')  
            }
        }
        getProximosEventos();
        console.log("A home foi gerada.")
    }, []);


    // Fake mock - API mocada:
    const [nextEvents, setNextEvents] = useState([]);

    return (
       <MainContent>
        <Banner />
        
        {/* NEXT EVENTS */}
        <section className='proximos-eventos'>
        <Container>

        <Title titleText={'Proximos eventos'}/>

        <div className='events-box'>
        <Swiper
        slidesPerView={ window.innerWidth >= 992 ? 3 : 1 }
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        >

        {
            nextEvents.map((e) => {
                return(
                <SwiperSlide>
                <NextEvent 
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
                </SwiperSlide>
                );
            })
        }
        </Swiper>

        </div>
        </Container>
        </section>

        <VisionSection />
        
        <ContactSection />
       </MainContent>
    );
};

export default HomePage;