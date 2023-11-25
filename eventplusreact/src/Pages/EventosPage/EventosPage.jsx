import React, { useState, useEffect } from "react";
import "./EventosPage.css";
import MainContent from "../../Components/MainContent/MainContent";

import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";
import { Input, Button, Select } from "../../Components/FormComponents/FormComponents";

import api from "../../Services/Service";
import TableEvento from "./TableEv/TableEv";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";

import eventImage from "../../assets/images/evento.svg";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";



const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [idEvento, setIdEvento] = useState(null);
  const [titulo, setTitulo] = useState("");

  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [instituicao, setInstituicao] = useState("68a03bdf-54fe-40b3-9c32-0fdbcfbc3be4");
  const [tipoEvento, setTipoEvento] = useState([]);

  const [events, setEvents] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState("");
  const [selectTipoEvento, setSelectTipoEvento] = useState("")

  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false);


  useEffect(() => {
    async function carregarEventos() {
      setShowSpinner(true);

      try {
        const retornoEventos = await api.get("/Evento");
        const retornoTipoEventos = await api.get("/TiposEvento");
        const retornoInstituicao = await api.get("/Instituicao");

        console.log(retornoTipoEventos.data);
        console.log(retornoEventos.data);
        setTipoEvento(retornoTipoEventos.data);
        setEvents(retornoEventos.data);
        setInstituicao(retornoInstituicao.data[0].idInstituicao);

      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
      setShowSpinner(false);
    }

    setFrmEdit(false)
    setTipoEvento([])
    carregarEventos();
  }, []);


  // CADASTRAR DADOS:
  async function handleSubmit(e) {
    // Parar o submit do formulário.
    e.preventDefault();

    // Validar pelo menos 3 caractéres.
    if (titulo.trim().lenght < 3) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `O título deve conter, no mínimo, 3 caractéres`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      return;
    }

    // Chamar a API
    try {
      const retorno = await api.post("/Evento", {
        nomeEvento: titulo,
        idTipoEvento: selectTipoEvento,
        dataEvento: data,
        descricao: descricao,
        idInstituicao: instituicao
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const buscaEventos = await api.get("/Evento");         
      setEvents(buscaEventos.data);


      setTitulo(""); // Limpa a variavel.
      setDescricao("");
      setSelectTipoEvento("");
      setData("");
    } catch (error) {
      console.log("Erro na API!");
      console.log(error);
    }
  }




  async function showUpdateForm(idEvento) {

    setFrmEdit(true);
    setIdEvento(idEvento);

    setShowSpinner(true);
    try {
      const searchEvent = await api.get(`/Evento/${idEvento}`,
        idEvento
      );
      setNomeEvento(searchEvent.data.nomeEvento);

      setDescricao(searchEvent.data.descricao);

      setData(searchEvent.data.dataEvento);

      setIdTipoEvento(searchEvent.data.idTipoEvento);

    } catch (error) {
      alert("Erro");
    }
    setShowSpinner(false);
  }
  }




  // ATUALIZAR OS DADOS:
  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const retorno = await api.put(`/Evento/${idEvento}`, {
        dataEvento: data,
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        idInstituicao: instituicao,
      });
      
      console.log(retorno);
      if (retorno.status === 204) {
        alert("Evento atualizado com sucesso");
        
        const retorno = await api.get("/Evento");
        setEvents(retorno.data);

        editActionAbort();

        loadEvents();
      }
    } catch (error) {
      alert("Erro ao atualizar");
    }
    setShowSpinner(false);
}



  // DELETAR OS DADOS:
  async function handleDelete(idEvento) {
    
    if (!window.confirm("Tem certeza que deseja excluir o evento selecionado?")) {
      return;
  }
    try {
      const retorno = await api.delete(`/Evento/${idEvento}`);

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const retornoGet = await api.get("/Evento");
      setEvents(retornoGet.data);
      
    } catch (error) {
      console.log("Erro ao deletar o elemento selecionado...");
    }
  }



function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setDescricao("");
    setSelectTipoEvento("");
    setData("");
  }




  return (
    <>
      <MainContent>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
        {showSpinner ? <Spinner /> : null}

        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro de eventos"} />
              <ImageIllustrator alterText={""} imageRender={eventImage} />
              <form
                action=""
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  <>
                    <Input
                      id={"titulo"}
                      type={"text"}
                      name={"titulo"}
                      required={"required"}
                      placeholder={"Título"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <Input
                      id={"descricao"}
                      type={"text"}
                      name={"descricao"}
                      required={"required"}
                      placeholder={"Descrição"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />
                    
                    <Select
                      option={tipoEvento}
                      id={"tiposEvento"}
                      name={"tiposEvento"}
                      manipulationFunction={
                          (e) => {
                              setSelectTipoEvento(e.target.value)
                          }
                      }
                    />
                    <Input
                      id={"data"}
                      type={"date"}
                      name={"dataEvento"}
                      required={"required"}
                      placeholder={"Data"}
                      value={data}
                      manipulationFunction={(e) => {
                        setData(e.target.value);
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      additionalClass="btn-cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  // TELA DE EDIÇÃO:
                  <>
                    <Input
                      id={"titulo"}
                      type={"text"}
                      name={"titulo"}
                      required={"required"}
                      placeholder={"Título"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />

                    <Input
                      id={"descricao"}
                      type={"text"}
                      name={"descricao"}
                      required={"required"}
                      placeholder={"Descrição"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Select
                       option={tipoEvento}
                       id={"tiposEvento"}
                       name={"tiposEvento"}
                       manipulationFunction={
                           (e) => {
                               setSelectTipoEvento(e.target.value)
                           }
                       }
                    />

                    <Input
                      id={"data"}
                      type={"date"}
                      name={"dataEvento"}
                      required={"required"}
                      placeholder={"Data"}
                      value={data}
                      manipulationFunction={(e) => {
                        setData(e.target.value);
                      }}
                    />

                    <div className="buttons-editbox">
                      <Button
                        type={"submit"}
                        id={"atualizar"}
                        name={"atualizar"}
                        textButton={"Atualizar"}
                        additionalClass="button-component--middle"
                      />

                      <Button
                        id={"cancelar"}
                        placeholder={"cancelar"}
                        name={"cancelar"}
                        textButton={"Cancelar"}
                        additionalClass="button-component--middle"
                        manipulationFunction={() => {
                          editActionAbort();
                        }}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Cadastro de Eventos"} color="white" />
            <TableEvento
              dados={events}
              fnDelete={handleDelete}
              fnUpdate={showUpdateForm}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );


export default EventosPage;
