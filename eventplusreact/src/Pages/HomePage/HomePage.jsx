import React from 'react';
import './HomePage.css'
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import Banner from '../../Components/Banner/Banner'
import VisionSection from '../../Components/VisionSection/VisionSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import NextEvent from '../../Components/NextEvent/NextEvent';
import Container from '../../Components/Container/Container'

const HomePage = () => {
    return (
       <MainContent>
        <Banner />
        
        {/* NEXT EVENTS */}
        <section className='proximos-eventos'>
        <Container>

        <Title titleText={'Proximos eventos'}/>
        <div className='events-box'>

        <NextEvent 
        title={"Evento de Dev"}
        description={"Evento massa."}
        eventDate={"17/02/2024"}
        idEvento={"34535GFE57"}
        />

        <NextEvent 
        title={"Evento de Dev"}
        description={"Evento massa."}
        eventDate={"17/02/2024"}
        idEvento={"34535GFE57"}
        />

        <NextEvent 
        title={"Evento de Dev"}
        description={"Evento massa."}
        eventDate={"17/02/2024"}
        idEvento={"34535GFE57"}
        />

        <NextEvent 
        title={"Evento de Dev"}
        description={"Evento massa."}
        eventDate={"17/02/2024"}
        idEvento={"34535GFE57"}
        />

        </div>
        </Container>
        </section>

        <VisionSection />
        
        <ContactSection />
       </MainContent>
    );
};

export default HomePage;