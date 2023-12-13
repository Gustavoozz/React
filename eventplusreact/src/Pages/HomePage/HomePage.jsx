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
import api, { nextEventResource, eventosPassadosResource } from '../../Services/Service'
import { UserContext } from '../../context/AuthContext';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

import { Pagination } from "swiper/modules";

import EventosPassados from "../../Components/EventosPassados/EventosPassados"
import { Link } from 'react-router-dom';



const HomePage = () => {
const {userData} = useContext(UserContext)

useEffect(()=> {
  async function  getNextEvents() {
    try {
      const promise = await api.get(nextEventResource)
      const dados = await promise.data;

      setNextEvents(dados); 
    } catch (error) {
      alert("Deu ruim na api!")
    }   
  }

  // async function getEventosPassados() {
  //   try {
  //     const promise = await api.get(eventosPassadosResource)
  //     const dados = await promise.data;

  //     setEventosPassados(dados);
  //   } catch (error) {
  //     alert("Erro")
  //   }
  // }
   getNextEvents(); 
  //  getEventosPassados();
}, [])

    // Fake mock - API mocada:
    const [nextEvents, setNextEvents] = useState([]);
    const [eventosPassados, setEventosPassados] = useState([]);

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
        
        <Container>
                <Title titleText={"Eventos passados"}/>
                <div className="events-box2">
      
                 {
                  eventosPassados.map((e) => {
                    return (
                    <SwiperSlide>
                    <EventosPassados
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvent={e.idEvento}
                    />
                    </SwiperSlide>
                    );
                  })
                 }
      
                </div>
              </Container>
        </section>

        <VisionSection />
        <ContactSection />
       </MainContent>
    );
};

export default HomePage;