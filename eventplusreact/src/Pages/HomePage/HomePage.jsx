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

const HomePage = () => {
    useEffect(() =>{
        // Chamar a API:
        async function getNextEvents() {
            try {
            const promise = await axios.get("https://localhost:7118/swagger/index.html"); 
            
            console.log(promise.data);
            setNextEvents(promise.data)

            } catch (error) {
              alert('Erro!')  
            }
        }
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
                  title={e.title}
                  description={e.descricao}
                  eventDate={e.data}
                  idEvento={e.id}
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