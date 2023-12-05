import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api, { eventsResource, eventsTypeResource } from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import { clear } from "@testing-library/user-event/dist/clear";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {

    async function loadEventsType() {
      setShowSpinner(true);
          try { // Todos os eventos:
             if (tipoEvento === "1") {

            const retorno = await api.get(eventsResource);
            const retornoEventos = await api.get(`/PresencasEvento/ListarMinhas/${userData.userId}`)

            const dadosMarcados = verificaPresenca(retorno.data, retornoEventos.data);
            console.clear();
            console.log("Dados marcados");
            console.log(dadosMarcados);

            setEventos(retorno.data);

            } else { // Meus eventos:

                let arrEventos = [];
                const retornoEventos = await api.get(`/PresencasEvento/ListarMinhas/${userData.userId}`)

                retornoEventos.data.forEach((element) => {
                    arrEventos.push({...element.evento, situacao : element.situacao})
                });

                setEventos(arrEventos);
            }

            } catch (error) {
                console.log("Erro!");
            }
        
      }
      setEventos([]);
  
      loadEventsType();
      setShowSpinner(false);
    }, [tipoEvento, userData.userId]);

    const verificaPresenca = (arrAllEvents, eventsUser) => { // Para cada evento (todos).

        // Verifica se o aluno está participando do evento atual (x).
        for (let x = 0; x < arrAllEvents.length; x++) {
        
        for (let i = 0; i < eventsUser.length; i++) { 

         // Verifica em meus eventos.
         if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {

           arrAllEvents[x].situacao = true;
           break;
         }          
        }
      }
      // Devolve o array modificado.
      return arrAllEvents;
}


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} additionalClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
