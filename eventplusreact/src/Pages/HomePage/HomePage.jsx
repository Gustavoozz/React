import React, { useEffect, useState } from 'react';
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

import Swiper from '../../Components/Swiper/Swiper'

const HomePage = () => {
    useEffect(() =>{
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

        {
            nextEvents.map((e) => {
                return(
                <NextEvent 
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
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