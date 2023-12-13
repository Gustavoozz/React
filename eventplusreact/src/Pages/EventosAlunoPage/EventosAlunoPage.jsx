import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api, { eventsResource, eventsTypeResource, myEventsResource } from "../../Services/Service";

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

  const [descricaoComentario, setDescricaoComentario] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [evento, setEvento] = useState([]);


  const [notifyUser, setNotifyUser] = useState({}); 


  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]); //

  async function loadEventsType() {
    setShowSpinner(true);
    // setEventos([]); //zera o array de eventos
    if (tipoEvento === "1") {
      //todos os eventos (Evento)
      try {
        const todosEventos = await api.get(eventsResource);
        const meusEventos = await api.get(
          `${myEventsResource}/${userData.userId}`
        );

        const eventosMarcados = verificaPresenca(
          todosEventos.data,
          meusEventos.data
        );

        setEventos(eventosMarcados);

        console.clear();

        console.log("TODOS OS EVENTOS");
        console.log(todosEventos.data);

        console.log("MEUS EVENTOS");
        console.log(meusEventos.data);

        console.log("EVENTOS MARCADOSSSS:");
        console.log(eventosMarcados);
      } catch (error) {
        //colocar o notification
        console.log("Erro na API");
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      /**
       * Lista os meus eventos (PresencasEventos)
       * retorna um formato diferente de array
       */
      try {
        const retornoEventos = await api.get(
          `${myEventsResource}/${userData.userId}`
        );
        console.clear();
        console.log("MINHAS PRESENÇAS");
        console.log(retornoEventos.data);

        const arrEventos = []; //array vazio

        retornoEventos.data.forEach((e) => {
          arrEventos.push({
            ...e.evento,
            situacao: e.situacao,
            idPresencaEvento: e.idPresencaEvento,
          });
        });

        // console.log(arrEventos);
        setEventos(arrEventos);
      } catch (error) {
        //colocar o notification
        console.log("Erro na API");
        console.log(error);
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);
  }

    const verificaPresenca = (arrAllEvents, eventsUser) => { // Para cada evento (todos).

        // Verifica se o aluno está participando do evento atual (x).
        for (let x = 0; x < arrAllEvents.length; x++) {
        
        for (let i = 0; i < eventsUser.length; i++) { 

         // Verifica em meus eventos.
         if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {

           arrAllEvents[x].situacao = true;
           arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
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
    // alert("Carregar o comentario")

  }

  async function postMyComentary(idComentary) {
    // alert("Cadastrar os comentarios")


    // try {

      const retorno = await api.post("/PresencasEvento", {

      descricao: descricaoComentario,
      exibe: true,
      idUsuario: usuario,
      idEvento: evento,
    });

    const newComentary = await api.get("/PresencasEvento");
    setDescricaoComentario(newComentary.data);

    setNotifyUser({
      titleNote: "Sucesso",
      textNote: `Comentario cadastrado com sucesso!`,
      imgIcon: "success",
      imgAlt:
        "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
      showMessage: true,
    });

    setDescricaoComentario("");


    // } catch (error) {
      // setNotifyUser({
      //   titleNote: "Erro",
      //   textNote: `Deu ruim ao cadastrar!!`,
      //   imgIcon: "danger",
      //   imgAlt:
      //     "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
      //   showMessage: true,
      // });
    // }
   


  }

  const showHideModal = async () => {
    setShowModal(showModal ? false : true);
  };



  const commentaryRemove = async (idElemento) => {
    // alert("Remover o comentário");

    if (!window.confirm("Confirma a exclusão?")) {
      return; 
    }

    setShowSpinner(true);
    try {
      const promise = await api.delete(`/PresencasEvento/${idElemento}`);

      if (promise.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso!",
          textNote: "Evento excluído com sucesso!",
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });

        const searchComentary = await api.get("/PresencasEvento");
       
        setEventos(searchComentary.data);
      } else {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `O servidor bitolou, verifique se o comentário foi apagado corretamente`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
          showMessage: true,
        });
        throw new Error(
          "O servidor bitolou, verifique se o comentario foi apagado corretamente"
        );
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Problemas ao apagar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
      throw new Error(`Problemas ao apagar: ${error}`);
    }
    setShowSpinner(false);
  };

  

   async function handleConnect(idEvent, whatTheFunction, idPresencaEvento = null) {

    if (whatTheFunction === "connect") {

      try {
        const retorno = await api.post("/PresencasEvento", {
          situacao : true,
          idUsuario : userData.userId,
          idEvento : idEvent
        });

        if (retorno.status === 201) {
          loadEventsType();
          // alert("Presença confirmada, parabéns!")
        }

      } catch (error) {
        console.log("Erro!");
        console.log(error);
      }
      return;
    }

    // Unconnect: 
    const retornoDelete = await api.delete("/PresencasEvento/" + idPresencaEvento);
    if (retornoDelete.status === 204) {
      loadEventsType();
      // alert("Desconectado do evento.")
    }
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
          fnPost={postMyComentary}
          fnGet={loadMyComentary}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
