import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../Components/Banner/Banner";
import MainContent from "../../Components/MainContent/MainContent";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import Title from "../../Components/Title/Title";
import NextEvent, { DetalhesEvents } from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import api, { eventsResource } from "../../Services/Service";
import Notification from "../../Components/Notification/Notification";
import { nextEventResource } from "../../Services/Service";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

import { Pagination } from "swiper/modules";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [fullEvents, setFullEvents] = useState([]);

  function dataExpirada(dataEvento) {
    const dataAtualMod = new Date()
    const dataEventoMod = new Date(dataEvento);

    return dataEventoMod <= dataAtualMod}

    async function getFullEventos() {
      try {
        const promise = await api.get(eventsResource);
        console.log(promise.data);
       
        setFullEvents(promise.data);
        

     
      } catch (error) {
        console.log("Deu ruim na API");
      }
    }  

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    getNextEvents();
    getFullEventos() //chama a função
  }, []);

  return (
    
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>

          <Title titleText={"Próximos Eventos"} />
          <div className="events-box">
          <Swiper
        slidesPerView={ window.innerWidth >= 992 ? 3 : 1 }
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        >

            {nextEvents.map((e) => {
              return (
                <SwiperSlide>
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
                 </SwiperSlide>
              );
            })}
                </Swiper> 
          </div>


          <Title titleText={"All Events"} />
            <div className="events-box">
            <Swiper
        slidesPerView={ window.innerWidth >= 992 ? 3 : 1 }
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        >
              {fullEvents.map((e) => {
                return (
                  <SwiperSlide>
                  <DetalhesEvents
                    idEvento={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    classAdd={dataExpirada(e.dataEvento)}
                    text={"Visualizar"}
                  />
                   </SwiperSlide>
                );
              })}
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